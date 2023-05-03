import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormationI, MatiereI, UeI } from 'src/app/modeles/formation-i';
import { FormationGetService } from 'src/app/services/formation-get.service';
import { GestionFichesService } from 'src/app/services/gestion-fiches.service';
import { MatDialog } from '@angular/material/dialog';
import { FormAddEditComponent } from '../form-add-edit/form-add-edit.component';
import { auto } from '@popperjs/core';
import { MatiereGetService } from 'src/app/services/matiere-get.service';



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

  
  constructor(private route: ActivatedRoute,public gestionService: GestionFichesService, public matiereService : MatiereGetService) { }
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
    console.log('ue dans la fonction ajouter: ', this.ue);
    this.ue.id = this.formation.ue!.length || 0; 
    this.formation.ue!.push({...this.ue});
    console.log("res final !",this.formation);
  }

  ajouterMatiere(){
    const selectedUe = this.formation.ue?.find(ue => ue.id === this.ue.id );

    if (selectedUe) {
      if (!selectedUe.matiere) {
        selectedUe.matiere = []; // initialize the matiere array if it's not defined
      }
      selectedUe.matiere.push({...this.matiere});
      console.log(this.matiere.id)
      console.log("res final !",this.formation);
      //this.matiereService.postMatiereApi(this.matiere)
    } else {
      console.log("Selected UE not found!");
    }
    // console.log("///////////",selectedUe?.matiere)
    // selectedUe!.matiere!.push(this.matiere);
    //console.log("res final !",this.formation);


  }

  // ici j'ai mis departement car j'ai pas encore d'id pour les matiere et les ue donc c'est galere de les delete by id 
  delete(departement:string, id_ue: number) {
    const selectedUe = this.formation.ue?.find(ue => ue.id === id_ue)
    if (selectedUe) {
      console.log(selectedUe,"avant")
      const matiere = selectedUe.matiere?.find(matiere => matiere.departement === departement);
      selectedUe.matiere = selectedUe.matiere?.filter(item => item !== matiere)
      console.log(selectedUe,"apres")
  }
  }
  validerFormation(): void{
    console.log(this.formation)
  }
} 
