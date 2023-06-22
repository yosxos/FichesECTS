import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControleI, MatiereI, MatiereI_post, MatiereI_put, UeI_post } from '../modeles/formation-i';
import { ControleGetService } from './controle-get.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class MatiereGetService {

  listMatiere: Array<MatiereI> = [];
  idToken: string = "";
  matierepost!: MatiereI_post;
  constructor(private httpClient: HttpClient, public controleGetService: ControleGetService) {
    //this.getMatiereApi();

    Auth.currentSession().then(data => {
      this.idToken = 'Bearer ' + data.getIdToken().getJwtToken();
    })
      .catch((error) => {
        console.log("token not found");
      });
  }

  // Récupère la matière par son id
  getMatiereById(id: number): MatiereI | undefined {
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


        this.listMatiere = response!;
        

    } catch (error) {
      console.error('Une erreur est survenue lors de la récupération des données de matière :', error);
    }
  }

  /**
  * Vérification des si les ID suivantes existent dans les données 
  */
  idInList(id: string | number): boolean {
    let tmp: boolean = false;
    this.listMatiere.forEach(element => id == element.id ? tmp = true : null)
    return tmp;
  }

  async postMatiereApi(matiere: MatiereI) {
    try {
      this.matierepost = {
        Pro: matiere.Pro,
        nom: matiere.nom,
        td: matiere.td,
        tp: matiere.tp,
        cm: matiere.cm,
        departement: matiere.departement,
        ects: matiere.ects,
        id_Controle: 1,
        TPE: matiere.TPE
      };

      const headers = new HttpHeaders().set('Authorization', this.idToken); // Replace 'my-token' with your actual token value
      const options = { headers };
      const response = await this.httpClient
        .post('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/matiere/edit', this.matierepost, options).subscribe(
          (response) => {
            console.log(response);
            return response // the response body is in the 'response' object
          },
          (error) => {
            console.error(error);
          }
        );

      return response!;
    } catch (error) {
      console.error('An error occurred while creating a new formation:', error);
      return undefined;
    }
  }

  async postMatiereApi2(matiere: MatiereI):Promise<number> {
      try {
        this.matierepost = {
          Pro: matiere.Pro,
          nom: matiere.nom,
          td: matiere.td,
          tp: matiere.tp,
          cm: matiere.cm,
          departement: matiere.departement,
          ects: matiere.ects,
          id_Controle: 1,
          TPE: matiere.TPE
        };

        const headers = new HttpHeaders().set('Authorization', this.idToken); // Replace 'my-token' with your actual token value
        const options = { headers };
        const response = await this.httpClient
          .post<any>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/matiere/edit', this.matierepost, options)
          .toPromise(); // Use toPromise() instead of subscribe() to convert the observable to a promise

        console.log(response.insertId);
        return response.insertId; // Return the insertId value from the response body

      } catch (error) {
        console.error('An error occurred while creating a new formation:', error);
        return -1;
      }
    }

    async putMatiereApi2(matiere: MatiereI_put):Promise<number> {
      try {
        const headers = new HttpHeaders().set('Authorization', this.idToken); // Replace 'my-token' with your actual token value
        const options = { headers };
        const response = await this.httpClient
          .put<any>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/matiere/edit', matiere, options)
          .toPromise(); // Use toPromise() instead of subscribe() to convert the observable to a promise

        console.log(response.insertId);
        return response.insertId; // Return the insertId value from the response body

      } catch (error) {
        console.error('An error occurred while creating a new formation:', error);
        return -1;
      }
    }

    // async deleteMatiereApi2(id_matiere: number):Promise<void> {
    //   try {
    //     const headers = new HttpHeaders().set('Authorization', this.idToken); // Replace 'my-token' with your actual token value
    //     const options = { headers };
    //     const response = await this.httpClient
    //       .delete<any>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/matiere/edit', id_matiere, options)
    //       .toPromise(); // Use toPromise() instead of subscribe() to convert the observable to a promise

    //     console.log(response.insertId);
    //     return response.insertId; // Return the insertId value from the response body

    //   } catch (error) {
    //     console.error('An error occurred while creating a new formation:', error);
    //     return -1;
    //   }
    // }
}

