import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormationI, MatiereI, MatiereI_post, UeI, UeI_post } from 'src/app/modeles/formation-i';
import { FormAddEditComponent } from '../form-add-edit/form-add-edit.component';
import { auto } from '@popperjs/core';
import { MatiereGetService } from 'src/app/services/matiere-get.service';
import { UeGetService } from 'src/app/services/ue-get.service';
import { FormationGetService } from 'src/app/services/formation-get.service';

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})

export class AddFormationComponent implements OnInit, OnChanges {

  idFiche !: number;
  showUEForm: boolean = false;
  isActive = false;
  index: number = 0;
  @Input() formation: FormationI = <FormationI>{}
  @Input() ue: UeI = <UeI>{}
  @Input() matiere: MatiereI = <MatiereI>{}
  boolMatiere: boolean = false;

  matierepost: MatiereI_post = <MatiereI_post>{};
  uepost: UeI_post = <UeI_post>{};
  annee_plus_un!: number;
  constructor(private _dialog: MatDialog, public matieresService: MatiereGetService, public ueService: UeGetService, public formationService: FormationGetService) { }


  ngOnInit(): void {
    console.log(this.formationService.listeFormations );
    
    this.formation.ue = [];
    this.ue.matiere = [];
  }

  annee_plus_un_toString(annee: string): string {
    return (parseInt(annee) + 1).toString()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formation']) {
      console.log("entrééééé-------------éééééééééééééé",this.ue)
      this.formation = changes['formation'].currentValue;
    }
    if(changes['ue']){
      this.ue = changes['ue'].currentValue;
      console.log("entrééééééééééééééééééé",this.ue)
    }
    if (changes['matiere']) {
      console.log("entrééééééééééééékdhdjféééééé",this.ue)
      this.matiere = changes['matiere'].currentValue;
    }

  }



  onYearChanged() {
    this.annee_plus_un = this.formationService.sum(this.formation.annee, Number(1));
  }

  formUe() {
    this.showUEForm = !this.showUEForm
  }

  // fermerFormMatiere(){
  //   this.boolMatiere = false;
  // }

  // fermerFormUe(){
  //   this.showUEForm = false;
  // }

  check_id_ue(id: number): boolean {
    return this.formation.ue?.some(ue => ue.id === id)!;
  }

  selectByUeId(idd: number) {
    this.showUEForm = false;
    this.ue = <UeI>{} //TODO peut etre inutile 
    this.matiere = <MatiereI>{} //TODO peut etre in
    this.boolMatiere = true;
    if (this.check_id_ue(idd)) {
      
      this.ue = this.formation.ue?.find(ue => ue.id === idd)!;
      console.log("Ue selected",this.ue);
    }else{
      alert("Please select")
    }
  }
  //TODO ajouter une ue apres avoir rentré des matieres sur une UE crée une nouvelle  ue avec un copie  des matieres de crée juste avant dans l'autre ue 
  ajouterUe() {
    console.log("////////////////////// Ue ", this.ue);
    
    /* etape 1
      add ue add mat dans cette ue 
      add new ue implique que les mat s'ajoutennt aussi dans la new ue
    */
    // this.ue.matiere rempli 
    /**
     * Variable tmp pour  push ue 
     */
    if (this.ue.matiere){
      if(this.ue.matiere!.length>0){
        this.ue.matiere = []
      }
    }
    
    let id_tmp: number = this.formation.ue?.length || 0;
    this.ue.id = id_tmp + 1
    console.log("ID lasted : ", this.ue.id);
    console.log("Ue added : ", this.ue);
/* etape 1*/ 

    this.formation.ue!.push({ ...this.ue });
    this.ue = <UeI>{};//TODO peut etre inutile
    this.ue.matiere = []
    console.log("this.ue cleaned : ", this.ue);
    console.log(this.formation)
  }

  ajouterMatiere() {
    console.log("////////////////////// matiere ", this.matiere);

    this.showUEForm = false;
    

    if (this.check_id_ue(this.ue.id)) {
      console.log("entrée");
      
      let id_tmp : number = this.ue.matiere?.length || 0;
      console.log("id_tmp", id_tmp);

      this.matiere.id = id_tmp + 1;
      console.log("this.matiere",this.matiere);
      // trouve plusieurs ue 
      console.log("//////////////////////////////////////////////////",this.formation.ue?.find(ue => ue.id === this.ue.id));
      
      this.formation.ue?.find(ue => ue.id === this.ue.id)!.matiere!.push({ ...this.matiere})
    }else {
      alert("Selected UE not found!");
      console.log("Selected UE not found!");
    }
    this.ue = <UeI>{};
    this.ue.matiere = [];
    this.matiere = <MatiereI>{};
    this.boolMatiere = false

  }

  // ici j'ai mis departement car j'ai pas encore d'id pour les matiere et les ue donc c'est galere de les delete by id 
  deleteMatiere(departement: string, id_ue: number) {


    const selectedUe = this.formation.ue?.find(ue => ue.id === id_ue)


    if (selectedUe) {
      const matiere = selectedUe.matiere?.find(matiere => matiere.departement === departement);
      selectedUe.matiere = selectedUe.matiere?.filter(item => item !== matiere)
    }
  }


  deleteUe(id_ue: number) {
    const ueIndex = this.formation.ue?.findIndex(ue => ue.id === id_ue);


    if (ueIndex != undefined) {
      if (this.formation.ue != undefined) {

        for (let i = 0; i < this.formation.ue.length; i++) {

        }
        this.formation.ue?.splice(ueIndex, 1);
      }

    }
  }

  async validerFormation(): Promise<void> {

    if (this.formation.ue?.length != undefined) {
      // Ne post pas de formation sans UE 
      const insertIdFormation = await this.formationService.postFormationApi(this.formation)
      for (let i = 0; i < this.formation.ue.length; i++) {

        if (this.formation.ue[i].matiere != undefined) {
          const insertIdUe = await this.ueService.postUeApi(this.formation.ue[i])

          for (let j = 0; j < this.formation.ue[i].matiere!.length; j++) {
            // TODO stupide interaction l'object peut etre undefined dans le if alors que pour rentrer dans le if il faut qu'il soit defini 
            let matiereVide: MatiereI = {
              id: -1,
              Pro: -1,
              nom: "-1",
              td: -1,
              tp: -1,
              cm: -1,
              departement: "-1",
              ects: -1,
              // id_Controle: -1,
              id_Controle: {
                id: -1,
                type_control_S1: "--", // enum
                type_control_S2: "--", // enum
                type_epreuve_S1: "E", // enum
                type_epreuve_S2: "E", // enum
                regle_particuliere: "string",
                regle_calcul_S1: -1,
                regle_calcul_S2: -1
              },
              TPE: -1
            };

            const insertIdMat = await this.matieresService.postMatiereApi2(this.formation.ue.at(i)?.matiere!.at(j) || matiereVide);

            this.ueService.postMatiere_Ue_ids(insertIdUe, insertIdMat)
          }
          this.formationService.postFormation_Ue_ids(insertIdUe, insertIdFormation)
        }
      }
    }
    console.log(this.formation)
  }
  //TODO faire le post de la formation et refaire pareil que pour matiere et ue pour l'association des ue à la formation créée
}


