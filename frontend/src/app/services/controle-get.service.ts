import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControleI } from '../modeles/formation-i';

@Injectable({
  providedIn: 'root'
})
export class ControleGetService {

  listControle: Array<ControleI> = [];

  constructor(private httpClient: HttpClient) {
    this.getControleApi();
  }

  // Récupère le controle par son id
  getControleById(id: any): ControleI | undefined{
    return this.listControle.find(ue => ue.id === id);
  }

  // Récupère les données de la table controle
  getControleApi(){
    this.httpClient.get<Array<ControleI>>('https://gd9eauezge.execute-api.eu-west-3.amazonaws.com/prod/controle').subscribe(
      (response) => {
        this.listControle = response;
      }
    )
  }

}
