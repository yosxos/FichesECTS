import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormationI, MatiereI, UeI } from '../modeles/formation-i';
import { FormationGetService } from './formation-get.service';
import { MatiereGetService } from './matiere-get.service';
import { UeGetService } from './ue-get.service';

@Injectable({
  providedIn: 'root'
})
export class GestionFichesService {

 

  constructor(private httpClient:HttpClient, public formationService: FormationGetService, public ueService: UeGetService, public matiereService: MatiereGetService) { }
  
  /** 
   * 
   * TODOO : 
   * 
   * GESTION DES CAS OU LES DONNEES NE SONT PAS TROUVEES
   * TRY CATCH A IMPLEMENTER
   * 
   * */

  // Récupère les données de la table formation_ue
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
  }  
}


  

