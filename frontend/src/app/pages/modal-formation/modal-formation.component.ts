import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationI } from 'src/app/modeles/formation-i';






@Component({
  selector: 'app-modal-formation',
  templateUrl: './modal-formation.component.html',
  styleUrls: ['./modal-formation.component.scss']
})

export class ModalFormationComponent implements OnInit {

  @ViewChild('htmlData') htmlData!: ElementRef;
  @Input() data?: FormationI;

  constructor(public activeModal: NgbActiveModal) {
  }
  ngOnInit(): void {
  }



  }

