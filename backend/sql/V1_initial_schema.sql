CREATE TABLE users (
  id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  prenom VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE admin (
  id INT NOT NULL,
  FOREIGN KEY (id) REFERENCES users(id)
);

CREATE TABLE Formation (
  id int NOT NULL,
  parcour VARCHAR(50) NOT NULL,
  année VARCHAR(50) NOT NULL,
  niveau VARCHAR(50) NOT NULL,
  code VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Responsable_formation (
  id_user INT NOT NULL,
  id_formation INT NOT NULL,
  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_formation) REFERENCES Formation(id)
);

CREATE TABLE UE (
  id int NOT NULL,
  semestre ENUM('semestre 1','semestre 2') NOT NULL,
  nom VARCHAR(50) NOT NULL,
  ects int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Controle (
  id int NOT NULL,
  type_control ENUM('--','CC','ET') NOT NULL,
  type_epreuve ENUM('E','O','E et/ou O') NOT NULL,
  regle_particuliere VARCHAR(50) NOT NULL,
  regle_calcul int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Matiere (
  id int NOT NULL,
  nom VARCHAR(50) NOT NULL,
  ects int NOT NULL,
  cm int NOT NULL,
  td int NOT NULL,
  tp int NOT NULL,
  Pro int NOT NULL,
  TPE int NOT NULL,
  departement VARCHAR(50) NOT NULL,
  id_session1 INT,
  id_session2 INT,
  PRIMARY KEY (id),
  FOREIGN KEY (id_session1) REFERENCES Controle(id),
  FOREIGN KEY (id_session2) REFERENCES Controle(id)
);

CREATE TABLE Matiere_UE (
  id_matiere INT NOT NULL,
  id_ue INT NOT NULL,
  FOREIGN KEY (id_matiere) REFERENCES Matiere(id),
  FOREIGN KEY (id_ue) REFERENCES UE(id)
);

CREATE TABLE Formation_UE (
  id_formation INT NOT NULL,
  id_ue INT NOT NULL,
  FOREIGN KEY (id_formation) REFERENCES Formation(id),
  FOREIGN KEY (id_ue) REFERENCES UE(id)
); 
