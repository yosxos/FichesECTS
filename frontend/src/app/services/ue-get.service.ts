import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatiereI, UeI } from '../modeles/formation-i';

@Injectable({
  providedIn: 'root'
})
export class UeGetService {

  listUe: Array<UeI> = [];

  constructor(private httpClient: HttpClient) {
    this.getUeApi();
   }

  // Récupère la formation par son id
  getUeById(id: number): UeI | undefined{
    return this.listUe.find(ue => ue.id === id);
  }

  // Récupère les données de la table ue
  async getUeApi(){
    await this.httpClient.get<Array<UeI>>('https://gd9eauezge.execute-api.eu-west-3.amazonaws.com/prod/ue').subscribe(
      (response) => {
        this.listUe = response
        this.listUe.forEach(ue => {ue.matiere = []})
      }
    )
  }

  // Ajout d'une matière à l'ue
  addMatiereToUe(index: number, matiere: MatiereI){
    this.listUe[index].matiere?.push(matiere as MatiereI);
  }

}
