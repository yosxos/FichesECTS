import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControleI, MatiereI } from '../modeles/formation-i';
import { ControleGetService } from './controle-get.service';

@Injectable({
  providedIn: 'root'
})
export class MatiereGetService {

  listMatiere: Array<MatiereI> = [];

  constructor(private httpClient: HttpClient, public controleGetService: ControleGetService) {
    this.getMatiereApi();
   }

  // Récupère la matière par son id
  getMatiereById(id: number): MatiereI | undefined{
    return this.listMatiere.find(matiere => matiere.id === id);
  }

  // Récupère les données de la table matiere
  async getMatiereApi(){
    this.listMatiere = [];
    await this.httpClient.get<Array<MatiereI>>('https://gd9eauezge.execute-api.eu-west-3.amazonaws.com/prod/matiere').subscribe(
      (response) => {
        try {
          response.forEach(matiere => {
            let session1 = this.controleGetService.getControleById(matiere.id_session1 as any);
            let session2 = this.controleGetService.getControleById(matiere.id_session2 as any);
            if (session1 && session2){
              matiere.id_session1 = session1 as ControleI;
              matiere.id_session2 = session2 as ControleI;
              this.listMatiere = response;
            }
          })
        }catch(e){
          console.log(e);
        }
      }
    )
  }

   /**
   * Vérification des si les ID suivantes existent dans les données 
   */
   idInList(id: string | number): boolean {
    let tmp: boolean = false; 
    this.listMatiere.forEach( element => id == element.id ? tmp = true : console.log("not in array", element))
    return tmp;
  }
  
}
