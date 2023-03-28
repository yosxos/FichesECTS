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
    matiere ?: Array<MatiereI>
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
    id_session1?: ControleI,
    id_session2?: ControleI,

}

export interface ControleI {
    id: number,
    type_control: string | "--"
    type_epreuve: "E" | "et/ou" | "O",
    regle_particuliere: string | "--",
    regle_calcul: number
}
