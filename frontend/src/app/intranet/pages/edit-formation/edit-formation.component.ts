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
  idFiche !: number;
  showUEForm: boolean = false;
  isActive = false;
  index: number = 0;
  annee_plus_un!: number;
  @Input() formation: FormationI = <FormationI>{}
  @Input() ue: UeI = <UeI>{}
  @Input() matiere: MatiereI = <MatiereI>{}
  boolMatiere: boolean = false;
  matiereSelected: MatiereI = <MatiereI>{}
  ueSelected: UeI = <UeI>{}
  // sum_cm!: number;
  // sum_td!: number;
  // sum_tp!: number;
  // sum_pro!: number;
  // sum_tpe!: number;
  sum_ects!: number;
  // nbMatiere!: number;

  constructor(private route: ActivatedRoute, public gestionService: GestionFichesService, public matieresService: MatiereGetService, public ueService: UeGetService, public formationService: FormationGetService) { }
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

  formUe() {
    this.showUEForm = !this.showUEForm
  }


  sumECTS(id: number, matiere_ects: number): number {
    let res: number = 0;
    const slected = this.formation.ue?.find(ue => ue.id === this.ue.id)!
    if (slected != undefined) {


      if (slected.matiere!.length > 0) {
        for (let i = 0; i < slected.matiere!.length; i++) {
          // console.log("i : ", i, "ects ", slected.matiere!.at(i - 1)!.ects);

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
          // console.log("i : ", i, "cm ", slected.matiere!.at(i - 1)!.cm);

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
          // console.log("i : ", i, "cm ", slected.matiere!.at(i - 1)!.tp);

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
          // console.log("i : ", i, "cm ", slected.matiere!.at(i - 1)!.Pro);

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
          // console.log("i : ", i, "cm ", slected.matiere!.at(i - 1)!.TPE);

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
          // console.log("i : ", i, "cm ", slected.matiere!.at(i - 1)!.td);

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

  focus(idd: number) {
    console.log("entreée");

    this.boolMatiere = !this.boolMatiere;
    console.log(idd);
    const selectedUe = this.formation.ue?.find(ue => ue.id === idd);


    if (selectedUe) {
      console.log("entreée", selectedUe.id);
      this.ue = selectedUe;
      console.log(this.ue)
    }
  }

  async ajouter() {
    // console.log('ue dans la fonction ajouter: ', this.ue);
    this.showUEForm = !this.showUEForm

    this.ue.id = this.formation.ue!.length || 0;
    this.formation.ue!.push({ ...this.ue });
    const insertIdUe = await this.ueService.postUeApi(this.ue)
    this.formationService.postFormation_Ue_ids(insertIdUe, this.formation.id)
    alert("L'UE a été ajouté")
    // console.log("res final !",this.formation);
  }

  async ajouterMatiere() {
    this.sum_ects = this.matiere.ects;//8
    // this.sum_cm = this.matiere.cm
    // this.sum_td = this.matiere.td;
    // this.sum_tp = this.matiere.tp;
    // this.sum_pro = this.matiere.Pro;
    // this.sum_tpe = this.matiere.TPE;
    const selectedUe = this.formation.ue?.find(ue => ue.id === this.ue.id);
    const id_ue = this.formation.ue?.find(ue => ue.id === this.ue.id)!.id!


    // this.sum_ects = this.sumECTS(id_ue, this.matiere.ects);
    // this.sum_cm = this.sumCM(id_ue, this.matiere.cm);
    // this.sum_td = this.sumTd(id_ue, this.matiere.td);
    // this.sum_tp = this.sumTp(id_ue, this.matiere.tp);
    // this.sum_pro = this.sumPro(id_ue, this.matiere.Pro);
    // this.sum_tpe = this.sumTPE(id_ue, this.matiere.TPE);



    this.formation.ue!.find(ue => ue.id === this.ue.id)!.ects = this.sum_ects;
    // this.formation.ue!.find(ue => ue.id === this.ue.id)!. = this.sum_cm;

    this.sum_ects = 0;
    if (selectedUe) {
      console.log("selectedUe", selectedUe)
      if (!selectedUe.matiere) {
        selectedUe.matiere = []; // initialize the matiere array if it's not defined
      }
      selectedUe.matiere.push({ ...this.matiere });
      console.log("thematiere", this.matiere)
      alert("La matière a été ajouté")
      const insertIdMat = await this.matieresService.postMatiereApi2(this.matiere)
      this.ueService.postMatiere_Ue_ids(this.ue.id, insertIdMat)      // console.log("res final !",this.formation);
      //this.matiereService.postMatiereApi(this.matiere)
    } else {
      console.log("Selected UE not found!");
    }
    // console.log("///////////",selectedUe?.matiere)
    // selectedUe!.matiere!.push(this.matiere);
    //console.log("res final !",this.formation);


  }

  selectMatiere(id_matiere: number, id_ue: number) {
    this.ueSelected = this.formation.ue!.find(ue => ue.id === id_ue)! as UeI
    this.matiereSelected = this.ueSelected.matiere!.find(matiere => matiere.id === id_matiere) as MatiereI;


  }

  selectUE(id_ue: number) {
    this.ueSelected = this.formation.ue!.find(ue => ue.id === id_ue)! as UeI
  }

  deleteMatiere(id_matiere: number, id_ue: number) {
    const selectedUe = this.formation.ue?.find(ue => ue.id === id_ue)
    if (selectedUe) {

      const matiere = selectedUe.matiere?.find(matiere => matiere.id === id_matiere);
      selectedUe.matiere = selectedUe.matiere?.filter(item => item !== matiere)
      this.matieresService.deleteMatiereApi2(id_matiere)
      // console.log(selectedUe,"apres")
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
    this.ueService.deleteUeApi2(id_ue)
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
        // Ne post pas de formation sans UE 
        const insertIdFormation = await this.formationService.putFormationApi(this.formation)
        for (let i = 0; i < this.formation.ue.length; i++) {
          // TODO boucler sur les matieres et ajouter la somme des ects 
          this.formation.ue[i].ects = 0
          if (this.formation.ue[i].matiere != undefined) {
            const insertIdUe = await this.ueService.putUeApi(this.formation.ue[i])

            for (let j = 0; j < this.formation.ue[i].matiere!.length; j++) {
              // TODO stupide interaction l'object peut etre undefined dans le if alors que pour rentrer dans le if il faut qu'il soit defini 
              this.formation.ue[i].ects += this.formation.ue.at(i)?.matiere!.at(j)!.ects || 0
              let matierePut: MatiereI_put = {
                id: this.formation.ue.at(i)?.matiere!.at(j)!.id || 0,
                Pro: this.formation.ue.at(i)?.matiere!.at(j)!.Pro || 0,
                nom: this.formation.ue.at(i)?.matiere!.at(j)!.nom || "",
                td: this.formation.ue.at(i)?.matiere!.at(j)!.td || 0,
                tp: this.formation.ue.at(i)?.matiere!.at(j)!.tp || 0,
                cm: this.formation.ue.at(i)?.matiere!.at(j)!.cm || 0,
                departement: this.formation.ue.at(i)?.matiere!.at(j)!.departement || "",
                ects: this.formation.ue.at(i)?.matiere!.at(j)!.ects || 0,
                // id_Controle: -1,
                id_Controle: 1,
                TPE: this.formation.ue.at(i)?.matiere!.at(j)!.TPE || 0
              };

              const insertIdMat = await this.matieresService.putMatiereApi2(matierePut);

              // this.ueService.postMatiere_Ue_ids(insertIdUe, insertIdMat)
            }
            // this.formationService.postFormation_Ue_ids(insertIdUe, insertIdFormation)
          }
        }
        alert("La formation a bien été modifiée")
      }
    }
  }

  async modifierUE(my_ue: UeI): Promise<void> {
    let ue = this.formation.ue?.find(ue => ue.id === my_ue.id)
    console.log("UUUUUEEEE", ue);

  }

  async modifierMatiere(matiere: MatiereI): Promise<void> {
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
      id_Controle: 1,
      TPE: matiere.TPE
    };

    await this.matieresService.putMatiereApi2(matierePut)
  }
}
