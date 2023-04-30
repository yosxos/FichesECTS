import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControleI, MatiereI } from '../modeles/formation-i';
import { ControleGetService } from './controle-get.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class MatiereGetService {

  listMatiere: Array<MatiereI> = [];
  sessionToken: string = "";
  constructor(private httpClient: HttpClient, public controleGetService: ControleGetService) {
    //this.getMatiereApi();
    Auth.currentUserCredentials().then((response) => {
      this.sessionToken = response.sessionToken
      console.log("token : ",this.sessionToken);
    }).catch((error) => {
      console.log("token not found");
    });
   }

  // Récupère la matière par son id
  getMatiereById(id: number): MatiereI | undefined{
    return this.listMatiere.find(matiere => matiere.id === id);
  }

  // Récupère les données de la table matiere
  async getMatiereApi() {
    this.listMatiere = [];
  
    try {
      const response = await this.httpClient
        .get<Array<MatiereI>>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/matiere')
        .pipe(catchError((error) => throwError(error)))
        .toPromise();
  
      response!.forEach(matiere => {
        let controle = this.controleGetService.getControleById(matiere.id_Controle as any);
        if (controle) {
          matiere.id_Controle = controle as ControleI;
          this.listMatiere = response!;
        }
      });
    } catch (error) {
      console.error('Une erreur est survenue lors de la récupération des données de matière :', error);
    }
  }

   /**
   * Vérification des si les ID suivantes existent dans les données 
   */
   idInList(id: string | number): boolean {
    let tmp: boolean = false; 
    this.listMatiere.forEach( element => id == element.id ? tmp = true : console.log("not in array", element))
    return tmp;
  }

  async postMatiereApi(matiere : MatiereI) {
    try {

      const headers = new HttpHeaders().set('Authorization', this.sessionToken); // Replace 'my-token' with your actual token value
      const options = { headers };
      const response = await this.httpClient
        .post<MatiereI>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/ueMatiere', matiere)
        .pipe(catchError((error) => throwError(error)))
        .toPromise();
      return response!;
    } catch (error) {
      console.error('An error occurred while creating a new formation:', error);
      return undefined;
    }
  }
  
}
