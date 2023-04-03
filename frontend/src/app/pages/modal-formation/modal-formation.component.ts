import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { FormationI } from 'src/app/modeles/formation-i';
import { GestionFichesService } from 'src/app/services/gestion-fiches.service';


@Component({
  selector: 'app-modal-formation',
  templateUrl: './modal-formation.component.html',
  styleUrls: ['./modal-formation.component.scss']
})

export class ModalFormationComponent implements OnInit, OnDestroy {

  @ViewChild('htmlData') htmlData!: ElementRef;
  @Input() data?: FormationI;

  data$!: Observable<FormationI>;
  private subscription: Subscription;


  constructor(public activeModal: NgbActiveModal, private gestionService: GestionFichesService) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.gestionService.formationObservable$.subscribe((data => this.data = data))
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

