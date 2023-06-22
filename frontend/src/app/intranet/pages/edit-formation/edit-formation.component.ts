import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ControleI, FormationI, MatiereI, MatiereI_post, MatiereI_put, UeI } from 'src/app/modeles/formation-i';
import { FormationGetService } from 'src/app/services/formation-get.service';
import { GestionFichesService } from 'src/app/services/gestion-fiches.service';
import { MatDialog } from '@angular/material/dialog';
import { FormAddEditComponent } from '../form-add-edit/form-add-edit.component';
import { auto } from '@popperjs/core';
import { MatiereGetService } from 'src/app/services/matiere-get.service';
import { UeGetService } from 'src/app/services/ue-get.service';



@Component({
  selector: 'app-edit-formation',
  templateUrl: './edit-formation.component.html',
  styleUrls: ['./edit-formation.component.css']
})
export class EditFormationComponent implements OnInit, OnChanges {
  idFiche !: number ;
  showUEForm : boolean = false;
  isActive = false;
  index:number=0;
  @Input() formation: FormationI = <FormationI>{}
  @Input() ue: UeI = <UeI>{}
  @Input() matiere: MatiereI = <MatiereI>{}
  boolMatiere: boolean= false;
  matiereSelected: MatiereI = <MatiereI>{}
  ueSelected: UeI = <UeI>{}
  
  constructor(private route: ActivatedRoute,public gestionService: GestionFichesService, public matieresService: MatiereGetService, public ueService: UeGetService, public formationService: FormationGetService) { }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idFiche = Number(params.get('id'));
      this.formation = this.gestionService.getUeById(this.idFiche);
      console.log(this.formation);
    });
  }



  ngOnChanges(changes: SimpleChanges): void {
    console.log('dans ngOnChanges');
    if (changes['formation']) {
      
      this.formation = changes['formation'].currentValue;
    }
    if (changes['matiere']) {
      this.formation = changes['matiere'].currentValue;
    }

  }

  formUe(){
    this.showUEForm = !this.showUEForm
  }
  
  sumECTS(id: number, matiere_ects: number): number {
    let res: number = 0;
    const slected = this.formation.ue?.find(ue => ue.id === this.ue.id)!
    if (slected != undefined) {


      if (slected.matiere!.length > 0) {
        for (let i = 0; i < slected.matiere!.length; i++) {
          console.log("i : ", i, "ects ", slected.matiere!.at(i - 1)!.ects);

          res += slected.matiere!.at(i - 1)!.ects;
          // console.log("sssssssssssssssssss",res);
        }
        res += matiere_ects

      } else {
        res = matiere_ects;
      }
    }
    return res
  }
  

  focus(idd:number){
    console.log("entreée");

    this.boolMatiere = !this.boolMatiere;
    console.log(idd);
    const selectedUe = this.formation.ue?.find(ue => ue.id === idd );
    
    
    if (selectedUe) {
      console.log("entreée",selectedUe.id);
      this.ue = selectedUe;
      console.log(this.ue)
    }
  }

  ajouter(){
    // console.log('ue dans la fonction ajouter: ', this.ue);
    this.ue.id = this.formation.ue!.length || 0; 
    this.formation.ue!.push({...this.ue});
    // console.log("res final !",this.formation);
  }

  ajouterMatiere(){
    const selectedUe = this.formation.ue?.find(ue => ue.id === this.ue.id );

    if (selectedUe) {
      if (!selectedUe.matiere) {
        selectedUe.matiere = []; // initialize the matiere array if it's not defined
      }
      selectedUe.matiere.push({...this.matiere});
      console.log(this.matiere.id)
      // console.log("res final !",this.formation);
      //this.matiereService.postMatiereApi(this.matiere)
    } else {
      console.log("Selected UE not found!");
    }
    // console.log("///////////",selectedUe?.matiere)
    // selectedUe!.matiere!.push(this.matiere);
    //console.log("res final !",this.formation);


  }

  selectMatiere(id_matiere : number, id_ue: number) { 
    this.ueSelected =  this.formation.ue!.find(ue => ue.id === id_ue)! as UeI
    this.matiereSelected = this.ueSelected.matiere!.find(matiere => matiere.id === id_matiere) as MatiereI;


    
  }

  selectUE( id_ue: number) { 
    this.ueSelected =  this.formation.ue!.find(ue => ue.id === id_ue)! as UeI
  }

  // ici j'ai mis departement car j'ai pas encore d'id pour les matiere et les ue donc c'est galere de les delete by id 
  delete(departement:string, id_ue: number) {
    const selectedUe = this.formation.ue?.find(ue => ue.id === id_ue)
    if (selectedUe) {
      // console.log(selectedUe,"avant")
      const matiere = selectedUe.matiere?.find(matiere => matiere.departement === departement);
      selectedUe.matiere = selectedUe.matiere?.filter(item => item !== matiere)
      // console.log(selectedUe,"apres")
    }
    
  }
  
  async validerFormation(): Promise<void>{
   
    if (this.formation.ue?.length != undefined) {
      // Ne post pas de formation sans UE 
      const insertIdFormation = await this.formationService.putFormationApi(this.formation)
      for (let i = 0; i < this.formation.ue.length; i++) {

        if (this.formation.ue[i].matiere != undefined) {
          const insertIdUe = await this.ueService.putUeApi(this.formation.ue[i])

          for (let j = 0; j < this.formation.ue[i].matiere!.length; j++) {
            // TODO stupide interaction l'object peut etre undefined dans le if alors que pour rentrer dans le if il faut qu'il soit defini 
            let matiereVide: MatiereI_put = {
              id: -1,
              Pro: -1,
              nom: "-1",
              td: -1,
              tp: -1,
              cm: -1,
              departement: "-1",
              ects: -1,
              // id_Controle: -1,
              id_Controle: 1,
              TPE: -1
            };
            let matierePut: MatiereI_put = {
              id: this.formation.ue.at(i)?.matiere!.at(j)!.id  || 0,
              Pro: this.formation.ue.at(i)?.matiere!.at(j)!.Pro || 0,
              nom: this.formation.ue.at(i)?.matiere!.at(j)!.nom || "",
              td: this.formation.ue.at(i)?.matiere!.at(j)!.td || 0,
              tp: this.formation.ue.at(i)?.matiere!.at(j)!.tp || 0,
              cm: this.formation.ue.at(i)?.matiere!.at(j)!.cm|| 0,
              departement: this.formation.ue.at(i)?.matiere!.at(j)!.departement|| "",
              ects: this.formation.ue.at(i)?.matiere!.at(j)!.ects|| 0,
              // id_Controle: -1,
              id_Controle:1,
              TPE: this.formation.ue.at(i)?.matiere!.at(j)!.TPE|| 0
            };
            const insertIdMat = await this.matieresService.putMatiereApi2(matierePut || matiereVide);

            this.ueService.postMatiere_Ue_ids(insertIdUe, insertIdMat)
          }
          this.formationService.postFormation_Ue_ids(insertIdUe, insertIdFormation)
        }
      }
    }
    console.log(this.formation)
  }
  
  async modifierUE(my_ue: UeI) : Promise<void>{
    let ue = this.formation.ue?.find(ue => ue.id === my_ue.id)
    console.log("UUUUUEEEE", ue);
    
  }
  
  async modifierMatiere(matiere: MatiereI) : Promise<void>{
    console.log(matiere);

    let matierePut: MatiereI_put = {
      id: matiere.id,
      Pro: matiere.Pro,
      nom: matiere.nom,
      td: matiere.td,
      tp: matiere.tp,
      cm: matiere.cm,
      departement: matiere.departement,
      ects: matiere.ects,
      // id_Controle: -1,
      id_Controle:1,
      TPE: matiere.TPE
    };

   await this.matieresService.putMatiereApi2(matierePut)
  }
}
