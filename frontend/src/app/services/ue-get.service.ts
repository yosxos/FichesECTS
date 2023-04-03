import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatiereI, UeI } from '../modeles/formation-i';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UeGetService {

  listUe: Array<UeI> = [];

  constructor(private httpClient: HttpClient) {
    //this.getUeApi();        
  }

  // Récupère la formation par son id
  getUeById(id: number): UeI | undefined{
    return this.listUe.find(ue => ue.id === id);
  }

  // Récupère les données de la table ue
  async getUeApi() {
    this.listUe = [];
  
    try {
      const response = await this.httpClient
        .get<Array<UeI>>('https://gd9eauezge.execute-api.eu-west-3.amazonaws.com/prod/ue')
        .pipe(catchError((error) => throwError(error)))
        .toPromise();
  
      this.listUe = response!;
      this.listUe.forEach(ue => {ue.matiere = []})

    } catch (error) {
      console.error('Une erreur est survenue lors de la récupération des données de ue :', error);
    }
  }


  /**
 * Vérification des si les ID suivantes existent dans les données 
 */
  idInList(id: string | number): boolean {
    let tmp: boolean = false; 
    this.listUe.forEach( element => id == element.id ? tmp = true : console.log("not in array", element))
    return tmp;
  }

  // Ajout d'une matière à l'ue
  addMatiereToUe(index: number, matiere: MatiereI){
    this.listUe[index].matiere?.push(matiere as MatiereI);
  }

}
