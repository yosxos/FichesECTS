import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormationI, MatiereI, MatiereI_post, UeI, UeI_post } from 'src/app/modeles/formation-i';
import { FormAddEditComponent } from '../form-add-edit/form-add-edit.component';
import { auto } from '@popperjs/core';
import { MatiereGetService } from 'src/app/services/matiere-get.service';
import { UeGetService } from 'src/app/services/ue-get.service';

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


  constructor(private _dialog: MatDialog, public matieresService: MatiereGetService, public ueService: UeGetService) { }

  ngOnInit(): void {
    this.formation.code = "Code1";
    this.formation.ue = [];

    console.log('dans la page add-formation');
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

  formUe() {
    this.showUEForm = !this.showUEForm
  }

  // fermerFormMatiere(){
  //   this.boolMatiere = false;
  // }

  // fermerFormUe(){
  //   this.showUEForm = false;
  // }



  focus(idd: number) {
    console.log("entreée");

    this.boolMatiere = !this.boolMatiere;
    console.log(idd);
    const focusUe = this.formation.ue?.find(ue => ue.id === idd);


    if (focusUe) {
      console.log("entreée", focusUe.id);
      this.ue = focusUe;
      console.log(this.ue)
    }
  }

  //TODO ajouter une ue apres avoir rentré des matieres sur une UE crée une nouvelle  ue avec un copie  des matieres de crée juste avant dans l'autre ue 
  ajouter() {

    this.ue.id = this.formation.ue!.length || 0;
    //this.ue.matiere = [];
    console.log("avant push ", this.ue);
    this.formation.ue!.push({ ...this.ue });




  }

  ajouterMatiere() {
    const selectedUe = this.formation.ue?.find(ue => ue.id === this.ue.id);

    if (selectedUe) {
      if (!selectedUe.matiere) {
        selectedUe.matiere = []; // initialize the matiere array if it's not defined
      }


      //const cont = this.matieresService.postMatiereApi(this.matiere)
      //console.log(cont)
      // this.matiere.id = id;
      selectedUe.matiere.push({ ...this.matiere });
      console.log(this.matiere.id)
      console.log("res final !", this.formation);

    } else {
      console.log("Selected UE not found!");
    }
    // console.log("///////////",selectedUe?.matiere)
    // selectedUe!.matiere!.push(this.matiere);
    // console.log("res final !",this.formation);


  }

  // ici j'ai mis departement car j'ai pas encore d'id pour les matiere et les ue donc c'est galere de les delete by id 
  deleteMatiere(departement: string, id_ue: number) {
    console.log(id_ue);

    const selectedUe = this.formation.ue?.find(ue => ue.id === id_ue)
    console.log(selectedUe);

    if (selectedUe) {
      console.log(selectedUe, "avant")
      const matiere = selectedUe.matiere?.find(matiere => matiere.departement === departement);
      selectedUe.matiere = selectedUe.matiere?.filter(item => item !== matiere)
      console.log(selectedUe, "apres")
    }
  }


  deleteUe(id_ue: number) {
    const ueIndex = this.formation.ue?.findIndex(ue => ue.id === id_ue);
    console.log(id_ue);
    console.log(ueIndex);

    if (ueIndex != undefined) {
      if (this.formation.ue != undefined) {
        console.log("before loop", this.formation.ue);

        for (let i = 0; i < this.formation.ue.length; i++) {
          console.log("i : ", i);

          console.log("entrée", this.formation.ue.at(i));
        }
        console.log("ueIndex ", ueIndex);

        this.formation.ue?.splice(ueIndex, 1);
        console.log("apres", this.formation.ue);

      }

    }
    console.log("sorti");
  }

  async validerFormation(): Promise<void> {

    if (this.formation.ue?.length != undefined) {
      console.log("entrée AAAAAAA", this.formation.ue?.length);
      for (let i = 0; i < this.formation.ue.length; i++) {
        console.log("i : ", i);

        if (this.formation.ue[i].matiere != undefined) {
          let matiereIds : Array<number> = [];
          const insertIdUe = await this.ueService.postUeApi(this.formation.ue[i])

          for (let j = 0; j < this.formation.ue[i].matiere!.length; j++) {
            console.log("j : ", j);
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
            
            this.ueService.postMatiere_Ue_ids(insertIdUe,insertIdMat)            
            //TODO add les post mais attention pb async probable 
          }
        }
      }
    }
    console.log(this.formation)
  }
  //TODO faire le post de la formation et refaire pareil que pour matiere et ue pour l'association des ue à la formation créée
}


