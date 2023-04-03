import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormationI, FormationUeI, MatiereI, UeI, UeMatiereI } from '../modeles/formation-i';
import { FormationGetService } from './formation-get.service';
import { MatiereGetService } from './matiere-get.service';
import { UeGetService } from './ue-get.service';
import { Observable, of, throwError } from 'rxjs';
import { ControleGetService } from './controle-get.service';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GestionFichesService {

  listFormationUe: Array<FormationUeI> = [];
  listUeMatiere: Array<UeMatiereI> = [];


  constructor(private httpClient:HttpClient, public controleService: ControleGetService, public formationService: FormationGetService, public ueService: UeGetService, public matiereService: MatiereGetService) {
  }

  async someMethod(){
    await this.formationService.getFormations();
    await this.ueService.getUeApi();
    await this.matiereService.getMatiereApi();
    await this.getFormationUeApi();
    await this.getUeMatiereApi(); 
  }

   /* Récupère les données de la table formation_ue */
  async getFormationUeApi(){    
    this.listFormationUe = [];
    try{
      const response = await this.httpClient
        .get<Array<FormationUeI>>('https://gd9eauezge.execute-api.eu-west-3.amazonaws.com/prod/formationUe')
        .pipe(catchError((error) => throwError(error)))
        .toPromise();
      this.listFormationUe = response!;
    }catch(error) { 
      console.error('Une erreur est survenue lors de la récupération des données de formation :', error);
    }
  }

  /* Récupère les données de la table UeMatiere  */
  async getUeMatiereApi(){    
    this.listUeMatiere = [];
    try{
      const response = await this.httpClient
        .get<Array<UeMatiereI>>('https://gd9eauezge.execute-api.eu-west-3.amazonaws.com/prod/ueMatiere')
        .pipe(catchError((error) => throwError(error)))
        .toPromise();
      this.listUeMatiere = response!;
    }catch(error) {
      console.error('Une erreur est survenue lors de la récupération des données de UeMatiere :', error);
    }
  }  

  /**
   * Récupère les données de la table formation par son id
   */
  getFormationUeById(id_formation: number): Observable<FormationI>{
    
    console.log('avant le if :',this.idInListFormationUe(id_formation))
    if(this.idInListFormationUe(id_formation)){
      console.log('dans le if id_formation('+ id_formation +') :');
      
      let tmp_formation: FormationI = <FormationI>{};
      tmp_formation= this.formationService.getFormationById(id_formation)!;
      tmp_formation.ue = [];
      console.log("tmp_formation.UE", tmp_formation.ue);
      

      this.listFormationUe.forEach(formation_ue => {
        console.log('dans le forEach et verifie si id_formation('+ id_formation +') === formation_ue.id_formation('+ formation_ue.id_formation +') :');
        if(formation_ue.id_formation === id_formation){
          console.log('dans le if id_formation('+ id_formation +') === formation_ue.id_formation('+ formation_ue.id_formation +') :');
          if(this.ueService.idInList(formation_ue.id_ue)){
            console.log('dans le if id_ue('+ formation_ue.id_ue +') :');
            let tmpUe: UeI = this.ueService.getUeById(formation_ue.id_ue)!;
            tmpUe.matiere = [];
            console.log("tmpUe.matiere", tmpUe.matiere);
            this.getUeMatiereById(tmpUe);
            tmp_formation.ue?.push(tmpUe);
          }
        }
      })
      return of(tmp_formation);
      console.log("tmp_formation_ue", tmp_formation);
    }else{
      return throwError('Formation non trouvée');
    }
  }

  /**
   * Récupère les données de la table ue par son id
   */
  getUeMatiereById(tmp_ue: UeI) {
    console.log('avant le if de matiere',this.idInListUeMatiere(tmp_ue.id));
    
    if(this.idInListUeMatiere(tmp_ue.id)){
      console.log('dans le if id_ue('+ tmp_ue.id +') :');
      //let tmp_ue: UeI = this.ueService.getUeById(id_ue)!;  
      //tmp_ue.matiere = [];
      this.listUeMatiere.forEach(ue_matiere => {
        console.log('dans le forEach et verifie si id_ue('+ tmp_ue.id +') === ue_matiere.id_ue('+ ue_matiere.id_ue +') :');
        if(ue_matiere.id_ue === tmp_ue.id){
          console.log('dans le if id_ue('+ tmp_ue.id +') === ue_matiere.id_ue('+ ue_matiere.id_ue +') :');
          if(this.matiereService.idInList(ue_matiere.id_matiere)){
            console.log('dans le if id_matiere('+ ue_matiere.id_matiere +') :');
            let tmpMatiere: MatiereI = this.matiereService.getMatiereById(ue_matiere.id_matiere)!;
            tmp_ue.matiere?.push(tmpMatiere);
          }
        }
      });
    }
  }

  /**
   * Vérification des si les ID suivantes existent dans les données 
   */
  idInListFormationUe(id_formation: number): boolean {
    let tmp: boolean = false; 
    this.listFormationUe.forEach( element => id_formation == element.id_formation ? tmp = true : console.log("not in array", element))
    return tmp;
  }

  /**
   * Vérification des si les ID suivantes existent dans les données 
   */
  idInListUeMatiere(id_ue: number): boolean {
    let tmp: boolean = false; 
    this.listUeMatiere.forEach( element => id_ue == element.id_ue ? tmp = true : console.log("not in array", element))
    return tmp;
  }
  
}


  

