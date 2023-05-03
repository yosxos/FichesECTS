import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormationI, UeI } from '../modeles/formation-i';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Auth } from 'aws-amplify';


@Injectable({
  providedIn: 'root'
})
export class FormationGetService {
  public get httpClient(): HttpClient {
    return this._httpClient;
  }
  public set httpClient(value: HttpClient) {
    this._httpClient = value;
  }

  listeFormations: Array<FormationI> = [];
  idToken: string = "";
  constructor(private _httpClient: HttpClient) {
    Auth.currentSession().then(data => {
      this.idToken = 'Bearer ' + data.getIdToken().getJwtToken();
      
    })
      .catch((error) => {
        console.log("token not found");
      });
   }

  // Récupère la formation par son id
  getFormationById(id: number): FormationI | undefined{
    return this.listeFormations.find(formation => formation.id === id);
  }

  // Récupère les données de la table formation
  async getFormations() {
    this.listeFormations = [];
  
    try {
      const response = await this.httpClient
        .get<Array<FormationI>>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/formation')
        .pipe(catchError((error) => throwError(error)))
        .toPromise();
  
      this.listeFormations = response!;
      this.listeFormations.forEach(formation => formation.ue = []);
    } catch (error) {
      console.error('Une erreur est survenue lors de la récupération des données de formation :', error);
    }
  }

  // Modification de la formation
  addUeToFormation(index: number, ue: UeI){
    this.listeFormations[index].ue?.push(ue as UeI);
  }

   /**
   * Vérification des si les ID suivantes existent dans les données 
   */
   idInList(id: string | number): boolean {
    let tmp: boolean = false; 
    this.listeFormations.forEach( element => id == element.id ? tmp = true : console.log("not in array", element))
    return tmp;
  }

}
