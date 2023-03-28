import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormationI, UeI } from '../modeles/formation-i';

@Injectable({
  providedIn: 'root'
})
export class GestionFichesService {

  listeFormations: Array<FormationI> = [];

  listUe: Array<UeI> = [];

  constructor(private httpClient:HttpClient) { }

  getFormationUeApi(){
    this.httpClient.get<Array<UeI>>('https://gd9eauezge.execute-api.eu-west-3.amazonaws.com/prod/formationUe').subscribe(
      (response) => {
        console.log("formationUe : ", response);
      }
    )
  }

  getUeApi(){
    this.httpClient.get<Array<UeI>>('https://gd9eauezge.execute-api.eu-west-3.amazonaws.com/prod/ue').subscribe(
      (response) => {
        this.listUe = response
        console.log('ue : ', this.listUe);
      }
    )
  }

  getFormations(){
    this.httpClient.get<Array<FormationI>>('https://gd9eauezge.execute-api.eu-west-3.amazonaws.com/prod/formation').subscribe(
      (response) => {
        this.listeFormations = response;
        console.log('formation : ', this.listeFormations)
      }
    )
  }
}
