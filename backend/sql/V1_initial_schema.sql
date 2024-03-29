CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  prenom VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE admin (
  id INT NOT NULL,
  FOREIGN KEY (id) REFERENCES users(id)
);

CREATE TABLE Formation (
  id int NOT NULL AUTO_INCREMENT,
  parcour VARCHAR(50) NOT NULL,
  année VARCHAR(50) NOT NULL,
  niveau VARCHAR(50) NOT NULL,
  code VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Responsable_formation (
  id_user INT NOT NULL ,
  id_formation INT NOT NULL,
  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_formation) REFERENCES Formation(id)
);

CREATE TABLE UE (
  id int NOT NULL AUTO_INCREMENT,
  semestre ENUM('semestre 1','semestre 2') NOT NULL,
  nom VARCHAR(50) NOT NULL,
  ects int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Controle (
  id int NOT NULL AUTO_INCREMENT,
  type_control_S1 ENUM('--','CC','ET') NOT NULL,
  type_epreuve_S1 ENUM('E','O','E et/ou O') NOT NULL,
  regle_calcul_S1 int NOT NULL,
  type_control_S2 ENUM('--','CC','ET') NOT NULL,
  type_epreuve_S2 ENUM('E','O','E et/ou O') NOT NULL,
  regle_calcul_S2 int ,
  regle_particuliere VARCHAR(50) ,
  
  PRIMARY KEY (id)
);

CREATE TABLE Matiere (
  id int NOT NULL AUTO_INCREMENT,
  nom VARCHAR(50) NOT NULL,
  ects int NOT NULL,
  cm int NOT NULL,
  td int NOT NULL,
  tp int NOT NULL,
  Pro int NOT NULL,
  TPE int NOT NULL,
  departement VARCHAR(50) NOT NULL,
  id_Controle INT,
  PRIMARY KEY (id),
  FOREIGN KEY (id_Controle) REFERENCES Controle(id)
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

