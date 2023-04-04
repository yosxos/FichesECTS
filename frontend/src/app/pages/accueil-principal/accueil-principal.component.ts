import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormationComponent } from '../modal-formation/modal-formation.component';
import { FormationGetService } from 'src/app/services/formation-get.service';
import { GestionFichesService } from 'src/app/services/gestion-fiches.service';
import { Observable, of } from 'rxjs';
import { FormationI } from 'src/app/modeles/formation-i';
import { AuthServiceService } from 'src/app/services/auth-service.service';




@Component({
  selector: 'app-accueil-principal',
  templateUrl: './accueil-principal.component.html',
  styleUrls: ['./accueil-principal.component.scss']
})

export class AccueilPrincipalComponent implements OnInit {


  constructor(public formationService: FormationGetService, private modalService: NgbModal, public gestionService: GestionFichesService, public auth: AuthServiceService) {
  }

  ngOnInit(): void {
    this.gestionService.someMethod()
  }

  /** TODOO alerte en cas de manque de donnée ! */
  openModal(id : number) {
    this.gestionService.getFormationUeById(id);
    const modalRef = this.modalService.open(ModalFormationComponent);
    //modalRef.componentInstance.data = this.formationService.listeFormations.find(formation => formation.id === id);
  }

  connected() : boolean {
    return (this.auth.userId.status === 'actif'  || this.auth.userId.status === 'admin');
  }
}
