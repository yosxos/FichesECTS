export interface UserI {
    email: string;
    status: ResponsableI | "admin" | "actif" | "inactif" ;
}

export interface ResponsableI {
    list_formation: Array<number>;
}
