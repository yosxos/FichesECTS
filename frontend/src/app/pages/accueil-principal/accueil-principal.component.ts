import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormationComponent } from '../modal-formation/modal-formation.component';
import { FormationGetService } from 'src/app/services/formation-get.service';
import { GestionFichesService } from 'src/app/services/gestion-fiches.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-accueil-principal',
  templateUrl: './accueil-principal.component.html',
  styleUrls: ['./accueil-principal.component.scss']
})

export class AccueilPrincipalComponent implements OnInit {

  constructor(public formationService: FormationGetService, private modalService: NgbModal, public gestionService: GestionFichesService, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.gestionService.getFormationUeApi();
    this.gestionService.getUeMatiereApi()
  }
  connected() {
    return this.authService.connected()
  }
  openModal() {
    const modalRef = this.modalService.open(ModalFormationComponent);
    modalRef.componentInstance.data = this.formationService.listeFormations[0];
    console.log('data : ', modalRef.componentInstance.data);
  }
  

}
