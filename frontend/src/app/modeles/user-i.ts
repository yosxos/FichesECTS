export interface UserI {
    email: string;
    password: string;
    status: ResponsableI | "admin" | "actif" | "inactif" ;
}

export interface ResponsableI {
    list_fromation: Array<number>;
}
