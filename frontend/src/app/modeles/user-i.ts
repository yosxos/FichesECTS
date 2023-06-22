import { FormationI } from './formation-i';



export interface RespI {
    formations: FormationI[];
}
export interface UserI{
    userId: number;
    name: string;
    prenom: string;
    status?: {formations:FormationI[]} | "admin" |"default" ;
} 