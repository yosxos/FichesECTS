import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormationI, FormationUeI, UeI } from '../modeles/formation-i';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Auth } from 'aws-amplify';
import { FormationI_post } from '../modeles/formation-i';


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
  formationpost!: FormationI_post;
  formationUe!: FormationUeI;
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
    this.listeFormations.forEach( element => id == element.id ? tmp = true : console.log("not in array formation", element))
    return tmp;
  }
  sum(num1: number, num2: number): number {
    return parseFloat(num1.toString()) + parseFloat(num2.toString());
  }

  async postFormationApi(formation: FormationI):Promise<number> {
    try {
      this.formationpost = {
        parcour: formation.parcour,
        annee: formation.annee.toString() + "/"+ (this.sum(formation.annee,1)).toString(),
        niveau: formation.niveau,
        code: formation.code
      };

      const headers = new HttpHeaders().set('Authorization', this.idToken); // Replace 'my-token' with your actual token value
      const options = { headers };
      const response = await this.httpClient
        .post<any>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/formation/edit', this.formationpost, options)
        .toPromise(); // Use toPromise() instead of subscribe() to convert the observable to a promise

      console.log(response.insertId);
      return response.insertId; // Return the insertId value from the response body

    } catch (error) {
      console.error('An error occurred while creating a new formation:', error);
      return -1;
    }
  }

  async putFormationApi(formation: FormationI):Promise<number> {
    try {

      const headers = new HttpHeaders().set('Authorization', this.idToken); // Replace 'my-token' with your actual token value
      const options = { headers };
      const response = await this.httpClient
        .put<any>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/formation/edit', formation, options)
        .toPromise(); // Use toPromise() instead of subscribe() to convert the observable to a promise

      console.log(response.insertId);
      return response.insertId; // Return the insertId value from the response body

    } catch (error) {
      console.error('An error occurred while creating a new formation:', error);
      return -1;
    }
  }



  async postFormation_Ue_ids(ue_id :number ,formation_id:number ){
      try {
        this.formationUe = {
          id_ue: ue_id,
          id_formation: formation_id
        };
        // console.log("ue_id",ue_id);
        // console.log("formation_id", formation_id)
        // console.log("this.uepost",this.formationUe);
        
        const headers = new HttpHeaders().set('Authorization', this.idToken); // Replace 'my-token' with your actual token value
        const options = { headers };
        const response = await this.httpClient
            .post<any>('https://ttj3a1as81.execute-api.eu-west-3.amazonaws.com/prod/formationUe/edit', this.formationUe,options)
            .toPromise();
          // console.log(response.insertId);
            return response.insertId; // Return the insertId value from the response body
    
          } catch (error) {
            console.error('An error occurred while creating a new formation:', error);
            return -1;
          }
        }

}
