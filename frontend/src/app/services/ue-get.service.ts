import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatiereI, UeI, UeI_post, UeMatiereI } from '../modeles/formation-i';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class UeGetService {

  listUe: Array<UeI> = [];
  idToken: string = "";
  uepost!: UeI_post ;
  matiereUe!: UeMatiereI;
  constructor(private httpClient: HttpClient) {
    Auth.currentSession().then(data => {
      this.idToken = 'Bearer ' + data.getIdToken().getJwtToken();
    })
      .catch((error) => {
        console.log("token not found");
      });
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
        .get<Array<UeI>>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/ue')
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
    this.listUe.forEach( element => id == element.id ? tmp = true : null)
    return tmp;
  }

  // Ajout d'une matière à l'ue
  addMatiereToUe(index: number, matiere: MatiereI){
    this.listUe[index].matiere?.push(matiere as MatiereI);
  }

  async postUeApi(ue: UeI):Promise<number>  {
    try {
      this.uepost = {
        nom: ue.nom,
        semestre: ue.semestre ,
        ects: ue.ects || 0
      };
   
      const headers = new HttpHeaders().set('Authorization', this.idToken); // Replace 'my-token' with your actual token value
      const options = { headers };
      const response = await this.httpClient
          .post<any>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/ue/edit', this.uepost,options)
          .toPromise(); // Use toPromise() instead of subscribe() to convert the observable to a promise

          return response.insertId; // Return the insertId value from the response body
  
        } catch (error) {
          console.error('An error occurred while creating a new formation:', error);
          return -1;
        }
      }
      
      async putUeApi(ue: UeI):Promise<number>  {
        try {

          
          const headers = new HttpHeaders().set('Authorization', this.idToken); 
          const options = { headers };
          const response = await this.httpClient
              .put<any>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/ue/edit', ue,options)
              .toPromise(); 
    

              return response.insertId; // Return the insertId value from the response body
      
            } catch (error) {
              console.error('An error occurred while creating a new formation:', error);
              return -1;
            }
          }



async postMatiere_Ue_ids(ue_id: number,matiere_id:number):Promise<number>  {
  try {
    this.matiereUe = {
      id_ue: ue_id,
      id_matiere: matiere_id
    };

    
    const headers = new HttpHeaders().set('Authorization', this.idToken); // Replace 'my-token' with your actual token value
    const options = { headers };
    const response = await this.httpClient
        .post<any>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/ueMatiere/edit', this.matiereUe,options)
        .toPromise();
        return response.insertId; // Return the insertId value from the response body

      } catch (error) {
        console.error('An error occurred while creating a new formation:', error);
        return -1;
      }
    }
  
    async deleteUeApi2(id_ue: number): Promise<void> {
      try {
        const headers = new HttpHeaders().set('Authorization', this.idToken); // Replace 'my-token' with your actual token value
        const body = { id_ue: id_ue };
        const options = { headers,body };
        const response = await this.httpClient
          .request('delete','https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/formationUe/edit', options)
          .toPromise(); // Use toPromise() instead of subscribe() to convert the observable to a promise

      } catch (error) {
        console.error('An error occurred while creating a new formation:', error);
      }
    }
}