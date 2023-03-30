import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormationI, FormationUeI, MatiereI, UeI, UeMatiereI } from '../modeles/formation-i';
import { FormationGetService } from './formation-get.service';
import { MatiereGetService } from './matiere-get.service';
import { UeGetService } from './ue-get.service';

@Injectable({
  providedIn: 'root'
})
export class GestionFichesService {

  listFormationUe: Array<FormationUeI> = [];
  listUeMatiere: Array<UeMatiereI> = [];

  constructor(private httpClient:HttpClient, public formationService: FormationGetService, public ueService: UeGetService, public matiereService: MatiereGetService) {
    this.getFormationUeApi();
    this.getUeMatiereApi();
   }

   /* Récupère les données de la table formation_ue */
  async getFormationUeApi(){
    this.listFormationUe = [];
    await this.httpClient.get<Array<FormationUeI>>('https://gd9eauezge.execute-api.eu-west-3.amazonaws.com/prod/formationUe').subscribe(
      (response) => {
        this.listFormationUe = response;
      }
    )
  }

  /* Récupère les données de la table UeMatiere */
  async getUeMatiereApi(){
    this.listUeMatiere = [];
    await this.httpClient.get<Array<UeMatiereI>>('https://gd9eauezge.execute-api.eu-west-3.amazonaws.com/prod/ueMatiere').subscribe(
      (response) => {
        this.listUeMatiere = response;
      }
    )
  }  

  /**
   * Récupère les données de la table formation par son id
   */
  getFormationUeById(id_formation: number) {
    if(this.idInListFormationUe(id_formation)){

      let tmp_formation: FormationI = this.formationService.getFormationById(id_formation)!;
      

      let tmp_formation_ue: Array<FormationUeI> = [];

      this.listFormationUe.forEach(formation_ue => {
        if(formation_ue.id_formation === id_formation){
          tmp_formation_ue.push(formation_ue);
        }
      })

      tmp_formation_ue.forEach(formation_ue => {
        if(this.ueService.idInList(formation_ue.id_ue)){
          let tmpUe: UeI = this.ueService.getUeById(formation_ue.id_ue)!;
          this.getUeMatiereById(formation_ue.id_ue);
          tmp_formation.ue?.push(tmpUe);
        }
      })
      console.log("tmp_formation_ue", tmp_formation_ue);
    }else{
      alert("id formation non trouvé");
    }
  }

  /**
   * Récupère les données de la table ue par son id
   */
  getUeMatiereById(id_ue: number) {
    if(this.idInListUeMatiere(id_ue)){

      let tmp_ue: UeI = this.ueService.getUeById(id_ue)!;  

      
      let tmp_ue_matiere: Array<UeMatiereI> = [];
      this.listUeMatiere.forEach(ue_matiere => {
        if(ue_matiere.id_ue === id_ue){
          tmp_ue_matiere.push(ue_matiere);
        }
      });

      tmp_ue_matiere.forEach(ue_matiere => {
        if(this.matiereService.idInList(ue_matiere.id_matiere)){
          let tmpMatiere: MatiereI = this.matiereService.getMatiereById(ue_matiere.id_matiere)!;
          tmp_ue.matiere?.push(tmpMatiere);
        }
      });
    }else{
      alert("id ue non trouvé");
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
  
  /** 
   * 
   * TODOO : 
   * 
   * GESTION DES CAS OU LES DONNEES NE SONT PAS TROUVEES
   * TRY CATCH A IMPLEMENTER
   * 
   * */

  /* Récupère les données de la table formation_ue
  async getFormationUeApi(){
    await this.httpClient.get<Array<any>>('https://gd9eauezge.execute-api.eu-west-3.amazonaws.com/prod/formationUe').subscribe(
      (response) => {
        response.forEach(formation_ue => {
          let formation: FormationI = this.formationService.getFormationById(formation_ue.id_formation)!;
          let ue : UeI = this.ueService.getUeById(formation_ue.id_ue)!;     
          if(formation && ue){
            let index: number = this.formationService.listeFormations.findIndex(f => f.id === formation?.id);  
            this.formationService.addUeToFormation(index, ue);
            console.log('formation after add  ue : ', this.formationService.listeFormations[index]);
          }
        });
      }
    )
  }


  // Récupère les données de la table UeMatiere
  async getUeMatiereApi(){
    await this.httpClient.get<Array<any>>('https://gd9eauezge.execute-api.eu-west-3.amazonaws.com/prod/ueMatiere').subscribe(
      (response) => {
        response.forEach(ueMatiere => {
          let ue : UeI = this.ueService.getUeById(ueMatiere.id_ue)!;
          console.log('ue in getUeMatiere : ', ue);
          let matiere : MatiereI = this.matiereService.getMatiereById(ueMatiere.id_matiere)!;
          console.log('matiere in getUeMatiere : ', matiere);
               
          if(ue && matiere){
            let index: number = this.ueService.listUe.findIndex(u => u.id === ue?.id);  
            this.ueService.addMatiereToUe(index, matiere);
            console.log('ue after add  matiere : ', this.ueService.listUe[index]);
          }
        });
      }
    )
  }  */



}


  

