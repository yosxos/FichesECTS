export interface FormationI {
    id: number,
    parcour: string,
    annee: string,
    niveau: string,
    code: string 
    ue?: Array<UeI>
}

export interface UeI {
    id : number,
    nom : string,
    semestre : string,
    ects : number,
    matiere?: Array<MatiereI>
}

export interface MatiereI {
    id: number,
    nom: string,
    ects: number,
    cm: number,
    td: number,
    tp: number,
    Pro: number,
    TPE: number,
    departement: string,
    id_Controle?: ControleI,
}

export interface ControleI {
    id: number,
    type_control_S1: string | "--", // enum
    type_control_S2: string | "--", // enum
    type_epreuve_S1: "E" | "E et/ou O" | "O" , // enum
    type_epreuve_S2: "E" | "E et/ou O" | "O" , // enum
    regle_particuliere: string ,
    regle_calcul_S1: number
    regle_calcul_S2: number
}

export interface FormationUeI {
    id_formation: number,
    id_ue: number
}

export interface UeMatiereI {
    id_ue: number,
    id_matiere: number
}

export interface FormationI_post {
    parcour: string,
    annee: string,
    niveau: string,
    code: string 
    ue?: Array<UeI>
}

export interface UeI_post {
    nom : string,
    semestre : string,
    ects : number,
}


export interface MatiereI_post {
    nom: string,
    ects: number,
    cm: number,
    td: number,
    tp: number,
    Pro: number,
    TPE: number,
    departement: string,
    id_Controle: number,
}