import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormationI, UeI } from 'src/app/modeles/formation-i';


@Component({
  selector: 'app-form-add-edit',
  templateUrl: './form-add-edit.component.html',
  styleUrls: ['./form-add-edit.component.css']
})
export class FormAddEditComponent implements OnInit {

  @Input() isActive = false;

  ue: UeI = <UeI>{}
  formation: any;

  constructor(private matDialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public dataSource: any) {
      this.formation = this.dataSource as FormationI;
    }

  ngOnInit(): void {
    console.log("dans le modal: " ,this.dataSource);
  }

  onToggle(close: boolean){
    console.log('votre choix : ', close);
    this.isActive = false;
    this.matDialogRef.close(this.dataSource as FormationI);
  }

  ajouter(){
    console.log('ajout d\'une UE');
    console.log('ue : ', this.ue);
    console.log('dataSource : ', this.formation.ue?.push(this.ue));
    
  }



}
