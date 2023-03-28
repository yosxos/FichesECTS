import { Component, OnInit } from '@angular/core';
import { GestionFichesService } from 'src/app/services/gestion-fiches.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormationComponent } from '../modal-formation/modal-formation.component';

@Component({
  selector: 'app-accueil-principal',
  templateUrl: './accueil-principal.component.html',
  styleUrls: ['./accueil-principal.component.css']
})

export class AccueilPrincipalComponent implements OnInit {

  constructor(public formationService: GestionFichesService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.formationService.getFormationUeApi();
    this.formationService.getUeApi();
    this.formationService.getFormations();
  }

  openModal() {
    const modalRef = this.modalService.open(ModalFormationComponent);
    modalRef.componentInstance.data = this.formationService.listeFormations;
  }
  

}
