import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormationI, UeI } from 'src/app/modeles/formation-i';
import { FormAddEditComponent } from '../form-add-edit/form-add-edit.component';

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent implements OnInit, OnChanges {

  showUEForm = false;
  isActive = false;

  @Input() formation: FormationI = <FormationI>{}
  @Input() ue: UeI = <UeI>{}

  constructor(private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.formation.code = "code 269";
    this.formation.ue = [{id:0, nom: 'titouan le bg', ects : 30, semestre: "1"}];
    console.log('dans la page add-formation');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('dans ngOnChanges');
    if (changes['formation']) {
      this.formation = changes['formation'].currentValue;
    }
  }

  
  showNewModal(element?: any){
    this._dialog.open( FormAddEditComponent, {
      width: '600px',
      data: {
        title: `Formulaire de ...`,
        type: 'cet utilisateur',
        data: this.formation
      }
    })
    .afterClosed()
    .subscribe((res : FormationI) => {
      console.log('res after form called: ', res);
    });
    this.isActive = true;
  }

  

  ajouter(){
    console.log('ue dans la fonction ajouter: ', this.ue);
    this.formation.ue!.push(this.ue);
    console.log("res final !",this.formation);
  }


}


