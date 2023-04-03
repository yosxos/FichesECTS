import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { FormationI } from 'src/app/modeles/formation-i';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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

  download() {

    const doc = new jsPDF('l', 'mm', 'a4');

    const head = [['ID', 'Country', 'Index', 'Capital']]
    const data = [
      [1, 'Finland', 7.632, 'Helsinki'],
      [2, 'Norway', 7.594, 'Oslo'],
      [3, 'Denmark', 7.555, 'Copenhagen'],
      [4, 'Iceland', 7.495, 'Reykjavík'],
      [5, 'Switzerland', 7.487, 'Bern'],
      [9, 'Sweden', 7.314, 'Stockholm'],
      [73, 'Belarus', 5.483, 'Minsk'],
    ]
    autoTable(doc, {
      head: head,
      body: data,
      didDrawCell: (data) => { },
    });
    doc.save('ficheEcts_' + this.data?.parcour + '_' + this.data?.niveau + '_' + this.data?.annee + '.pdf')
  }
}

