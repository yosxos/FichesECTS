import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormationComponent } from '../modal-formation/modal-formation.component';
import { FormationGetService } from 'src/app/services/formation-get.service';
import { GestionFichesService } from 'src/app/services/gestion-fiches.service';
import { ChangeDetectorRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormationI } from 'src/app/modeles/formation-i';




@Component({
  selector: 'app-accueil-principal',
  templateUrl: './accueil-principal.component.html',
  styleUrls: ['./accueil-principal.component.scss']
})

export class AccueilPrincipalComponent implements OnInit {


  data$: Observable<FormationI>;


  constructor(public formationService: FormationGetService, private modalService: NgbModal, public gestionService: GestionFichesService, private changeDecor: ChangeDetectorRef) {
    this.data$ = of(<FormationI>{});
  }

  ngOnInit(): void {
    this.gestionService.someMethod()
  }

  /** TODOO alerte en cas de manque de donnée ! */
  openModal(id : number) {
    this.gestionService.getFormationUeById(id).subscribe(
      (new_data) => { this.data$ = of(new_data) },
      (error) => {console.log('error : ', error)},
    );
    const modalRef = this.modalService.open(ModalFormationComponent);
    modalRef.componentInstance.data = this.formationService.listeFormations.find(formation => formation.id === id);
    console.log('data : ', modalRef.componentInstance.data);
  }


}
