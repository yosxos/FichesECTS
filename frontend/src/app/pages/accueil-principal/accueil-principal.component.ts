import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormationComponent } from '../modal-formation/modal-formation.component';
import { FormationGetService } from 'src/app/services/formation-get.service';
import { GestionFichesService } from 'src/app/services/gestion-fiches.service';
import { FormationI } from 'src/app/modeles/formation-i';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-accueil-principal',
  templateUrl: './accueil-principal.component.html',
  styleUrls: ['./accueil-principal.component.scss']
})

export class AccueilPrincipalComponent implements OnInit {

  f: FormationI = <FormationI>{};

  constructor(public formationService: FormationGetService, private modalService: NgbModal, public gestionService: GestionFichesService, private changeDecor: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.gestionService.someMethod()

  }

  /** TODOO alerte en cas de manque de donnée ! */
  openModal(id : number) {
    this.f = <FormationI>{}
    this.gestionService.getFormationUeById(id).subscribe(
      () => { this.changeDecor.markForCheck(); },
      (error) => {console.log('error : ', error)},
    );
    const modalRef = this.modalService.open(ModalFormationComponent);
    modalRef.componentInstance.data = this.formationService.listeFormations.find(formation => formation.id === id);
    console.log('data : ', modalRef.componentInstance.data);
  }


}
