import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationI } from 'src/app/modeles/formation-i';

@Component({
  selector: 'app-modal-formation',
  templateUrl: './modal-formation.component.html',
  styleUrls: ['./modal-formation.component.css']
})

export class ModalFormationComponent {

  @Input() title?: string ;
  @Input() message?: string ;

  @Input() data?: FormationI;

  constructor(public activeModal: NgbActiveModal) {}

}
  