import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormationI, MatiereI, MatiereI_post, UeI, UeI_post } from 'src/app/modeles/formation-i';
import { FormAddEditComponent } from '../form-add-edit/form-add-edit.component';
import { auto } from '@popperjs/core';
import { MatiereGetService } from 'src/app/services/matiere-get.service';
import { UeGetService } from 'src/app/services/ue-get.service';
import { FormationGetService } from 'src/app/services/formation-get.service';
import { __esDecorate } from 'tslib';

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
  sum_cm!: number;
  sum_td!: number;
  sum_tp!: number;
  sum_pro!: number;
  sum_tpe!: number;
  sum_ects!: number;
  constructor(private _dialog: MatDialog, public matieresService: MatiereGetService, public ueService: UeGetService, public formationService: FormationGetService) { }


  ngOnInit(): void {
    console.log(this.formationService.listeFormations);

    this.formation.ue = [];
    this.ue.matiere = [];
  }

  annee_plus_un_toString(annee: string): string {
    return (parseInt(annee) + 1).toString()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formation']) {
      this.formation = changes['formation'].currentValue;
    }
    if (changes['ue']) {
      this.ue = changes['ue'].currentValue;
    }
    if (changes['matiere']) {
      this.matiere = changes['matiere'].currentValue;
    }

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


  sumCM(id: number, matiere_cm: number): number {
    let res: number = 0;
    const slected = this.formation.ue?.find(ue => ue.id === this.ue.id)!
    if (slected != undefined) {


      if (slected.matiere!.length > 0) {
        for (let i = 0; i < slected.matiere!.length; i++) {
          console.log("i : ", i, "cm ", slected.matiere!.at(i - 1)!.cm);

          res += slected.matiere!.at(i - 1)!.cm;
          // console.log("sssssssssssssssssss",res);
        }
        res += matiere_cm

      } else {
        res = matiere_cm;
      }
    }
    return res
  }
  sumTp(id: number, matiere_tp: number): number {
    let res: number = 0;
    const slected = this.formation.ue?.find(ue => ue.id === this.ue.id)!
    if (slected != undefined) {


      if (slected.matiere!.length > 0) {
        for (let i = 0; i < slected.matiere!.length; i++) {
          console.log("i : ", i, "cm ", slected.matiere!.at(i - 1)!.tp);

          res += slected.matiere!.at(i - 1)!.cm;
          // console.log("sssssssssssssssssss",res);
        }
        res += matiere_tp

      } else {
        res = matiere_tp;
      }
    }
    return res
  }
  sumPro(id: number, matiere_pro: number): number {
    let res: number = 0;
    const slected = this.formation.ue?.find(ue => ue.id === this.ue.id)!
    if (slected != undefined) {


      if (slected.matiere!.length > 0) {
        for (let i = 0; i < slected.matiere!.length; i++) {
          console.log("i : ", i, "cm ", slected.matiere!.at(i - 1)!.Pro);

          res += slected.matiere!.at(i - 1)!.Pro;
          // console.log("sssssssssssssssssss",res);
        }
        res += matiere_pro

      } else {
        res = matiere_pro;
      }
    }
    return res
  }

  sumTPE(id: number, matiere_tpe: number): number {
    let res: number = 0;
    const slected = this.formation.ue?.find(ue => ue.id === this.ue.id)!
    if (slected != undefined) {


      if (slected.matiere!.length > 0) {
        for (let i = 0; i < slected.matiere!.length; i++) {
          console.log("i : ", i, "cm ", slected.matiere!.at(i - 1)!.TPE);

          res += slected.matiere!.at(i - 1)!.TPE;
          // console.log("sssssssssssssssssss",res);
        }
        res += matiere_tpe

      } else {
        res = matiere_tpe;
      }
    }
    return res
  }

  sumTd(id: number, matiere_TD: number): number {
    let res: number = 0;
    const slected = this.formation.ue?.find(ue => ue.id === this.ue.id)!
    if (slected != undefined) {


      if (slected.matiere!.length > 0) {
        for (let i = 0; i < slected.matiere!.length; i++) {
          console.log("i : ", i, "cm ", slected.matiere!.at(i - 1)!.td);

          res += slected.matiere!.at(i - 1)!.td;
          // console.log("sssssssssssssssssss",res);
        }
        res += matiere_TD

      } else {
        res = matiere_TD;
      }
    }
    return res
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
    } else {
      alert("Please select")
    }
  }
  //TODO ajouter une ue apres avoir rentré des matieres sur une UE crée une nouvelle  ue avec un copie  des matieres de crée juste avant dans l'autre ue 
  ajouterUe() {
    this.sum_cm = 0;
    this.sum_td = 0;
    this.sum_tp = 0;
    this.sum_pro = 0;
    this.sum_tpe = 0;
    
    if (this.ue.matiere) {
      if (this.ue.matiere!.length > 0) {
        this.ue.matiere = []
      }
    }

    let id_tmp: number = this.formation.ue?.length || 0;
    this.ue.id = id_tmp + 1


    this.formation.ue!.push({ ...this.ue });
    this.ue = <UeI>{};//TODO peut etre inutile
    this.ue.matiere = []
    console.log(this.formation)
  }

  ajouterMatiere() {
    this.sum_ects = this.matiere.ects;//8
    this.sum_cm = this.matiere.cm
    this.sum_td = this.matiere.td;
    this.sum_tp = this.matiere.tp;
    this.sum_pro = this.matiere.Pro;
    this.sum_tpe = this.matiere.TPE;
    console.log(this.sum_ects);

    this.showUEForm = false;


    if (this.check_id_ue(this.ue.id)) {

      let id_tmp: number = this.ue.matiere?.length || 0;

      this.matiere.id = id_tmp + 1;
      // trouve plusieurs ue 
      const id_ue = this.formation.ue?.find(ue => ue.id === this.ue.id)!.id!
      this.sum_ects = this.sumECTS(id_ue, this.matiere.ects);
      this.sum_cm = this.sumCM(id_ue, this.matiere.cm);
      this.sum_td = this.sumTd(id_ue, this.matiere.td);
      this.sum_tp = this.sumTp(id_ue, this.matiere.tp);
      this.sum_pro = this.sumPro(id_ue, this.matiere.Pro);
      this.sum_tpe = this.sumTPE(id_ue, this.matiere.TPE);



      this.formation.ue!.find(ue => ue.id === this.ue.id)!.ects = this.sum_ects;
      // this.formation.ue!.find(ue => ue.id === this.ue.id)!. = this.sum_cm;

      this.sum_ects = 0;
      this.formation.ue?.find(ue => ue.id === this.ue.id)!.matiere!.push({ ...this.matiere })
    } else {
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


