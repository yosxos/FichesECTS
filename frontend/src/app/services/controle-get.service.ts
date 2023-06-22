import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControleI } from '../modeles/formation-i';
import { Auth } from 'aws-amplify';


@Injectable({
  providedIn: 'root'
})
export class ControleGetService {

  listControle: Array<ControleI> = [];
  idToken: string = "";
  constructor(private httpClient: HttpClient) {
    Auth.currentSession().then(data => {
      this.idToken = 'Bearer ' + data.getIdToken().getJwtToken();
    })
      .catch((error) => {
        console.log("token not found");
      });
    
  }

  // Récupère le controle par son id
  getControleById(id: number): ControleI | undefined{
    
    return this.listControle.find(ue => ue.id === id);
  }

   /**
   * Vérification des si les ID suivantes existent dans les données 
   */
   idInList(id: string | number): boolean {
    let tmp: boolean = false; 
    this.listControle.forEach( element => id == element.id ? tmp = true : console.log("not in array controle", element))
    return tmp;
  }

  // Récupère les données de la table controle
  getControleApi(){
    
    this.listControle = [];
    this.httpClient.get<Array<ControleI>>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/controle').subscribe(
      (response) => {
        this.listControle = response;
      }
    )
  }

}
