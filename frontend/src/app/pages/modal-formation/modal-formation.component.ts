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

  generatePDFDescription(): void {
    console.log('entreé');

    const element: Element | null = document.getElementById("htmlData");
    if (element) {
      let myWindows = window.open('',);
      if (myWindows) {
        myWindows.document.write("<!DOCTYPE html><html><head><meta charset='utf-8'><link rel='stylesheet' type='text/css' media='screen''>"
          + "<style>.matiere { background-color: blue; } .general { background-color: rgb(209, 198, 162); } .indication { background-color: white; } #maths { background-color: rgb(144, 241, 0); } #info { background-color: rgb(90, 219, 233); } #projet { background-color: rgb(255, 242, 0); } #hd { background-color: rgb(233, 137, 241); } #ieg { background-color: rgb(237, 177, 49); } #autre { background-color:rgb( 253 , 191 , 183); } table { margin-left: 30px; } td { border-width: 10px; } section { width: 1000px; }</style>");
        myWindows.document.write('</head><body>');
        myWindows.document.write(element.innerHTML);
        myWindows.document.write('</body></html>');
        myWindows.document.close();
        myWindows.print()
        myWindows.close();
      }
    }
  }
}

