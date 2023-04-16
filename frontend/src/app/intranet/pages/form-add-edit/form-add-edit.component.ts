import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-form-add-edit',
  templateUrl: './form-add-edit.component.html',
  styleUrls: ['./form-add-edit.component.css']
})
export class FormAddEditComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public dataSource: any,) { }

  ngOnInit(): void {
  }

  onToggle(close: boolean){
    console.log('votre choix : ', close);
    this.matDialogRef.close(close);
  }
}
