import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-element',
  templateUrl: './modal-element.component.html',
  styleUrls: ['./modal-element.component.css']
})
export class ModalElementComponent implements OnInit {
  
  constructor(
    private matDialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public dataSource: any,
  ){}

  ngOnInit(): void{
    console.log('jarrive sur la modal')
  }

  onToggle(close: boolean){
    console.log('votre choix : ', close);
    this.matDialogRef.close(close);
  }
}
