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
          res += slected.matiere!.at(i - 1)!.ects;
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
          res += slected.matiere!.at(i - 1)!.cm;
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
          res += slected.matiere!.at(i - 1)!.cm;
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
          res += slected.matiere!.at(i - 1)!.Pro;
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
          res += slected.matiere!.at(i - 1)!.TPE;
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
          res += slected.matiere!.at(i - 1)!.td;
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

  check_id_ue(id: number): boolean {
    return this.formation.ue?.some(ue => ue.id === id)!;
  }

  selectByUeId(idd: number) {
    this.showUEForm = false;
    this.ue = <UeI>{} 
    this.matiere = <MatiereI>{} //TODO peut etre in
    this.boolMatiere = true;
    if (this.check_id_ue(idd)) {

      this.ue = this.formation.ue?.find(ue => ue.id === idd)!;
    } else {
      alert("Please select")
    }
  }
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
    this.ue = <UeI>{};
    this.ue.matiere = []
  }

  ajouterMatiere() {
    this.sum_ects = this.matiere.ects;//8
    this.sum_cm = this.matiere.cm
    this.sum_td = this.matiere.td;
    this.sum_tp = this.matiere.tp;
    this.sum_pro = this.matiere.Pro;
    this.sum_tpe = this.matiere.TPE;
    this.showUEForm = false;

    
    if (this.check_id_ue(this.ue.id)) {

      let id_tmp: number = this.ue.matiere?.length || 0;

      this.matiere.id = id_tmp + 1;
      const id_ue = this.formation.ue?.find(ue => ue.id === this.ue.id)!.id!
      this.sum_ects = this.sumECTS(id_ue, this.matiere.ects);
      this.sum_cm = this.sumCM(id_ue, this.matiere.cm);
      this.sum_td = this.sumTd(id_ue, this.matiere.td);
      this.sum_tp = this.sumTp(id_ue, this.matiere.tp);
      this.sum_pro = this.sumPro(id_ue, this.matiere.Pro);
      this.sum_tpe = this.sumTPE(id_ue, this.matiere.TPE);



      this.formation.ue!.find(ue => ue.id === this.ue.id)!.ects = this.sum_ects;

      this.sum_ects = 0;
      this.formation.ue?.find(ue => ue.id === this.ue.id)!.matiere!.push({ ...this.matiere })
    } else {
      alert("Selected UE not found!");
    }
    this.ue = <UeI>{};
    this.ue.matiere = [];
    this.matiere = <MatiereI>{};
    this.boolMatiere = false

  }

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
    let totalEcts = 0;

    if (this.formation.ue?.length != undefined) {
      for (let i = 0; i < this.formation.ue.length; i++) {
        totalEcts += this.formation.ue.at(i)?.ects || 0

      }
      if (totalEcts < 30) {
        alert("La formation n'a pas assez d'ECTS")
      } else {
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
    alert("La formation a bien été ajoutée")

  }

  }
}


