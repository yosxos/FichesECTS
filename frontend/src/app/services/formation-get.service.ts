import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormationI, UeI } from '../modeles/formation-i';

@Injectable({
  providedIn: 'root'
})
export class FormationGetService {

  listeFormations: Array<FormationI> = [];

  constructor(private httpClient: HttpClient) {
    this.getFormations();
   }

  // Récupère la formation par son id
  getFormationById(id: number): FormationI | undefined{
    return this.listeFormations.find(formation => formation.id === id);
  }

  // Récupère les données de la table formation
  async getFormations(){
    this.listeFormations = [];
    await this.httpClient.get<Array<FormationI>>('https://gd9eauezge.execute-api.eu-west-3.amazonaws.com/prod/formation').subscribe(
      (response) => {
        console.log('response',response);
        this.listeFormations = response;
        this.listeFormations.forEach(formation => {formation.ue = []})
      }
    )
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
