import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormationComponent } from '../modal-formation/modal-formation.component';
import { FormationGetService } from 'src/app/services/formation-get.service';
import { GestionFichesService } from 'src/app/services/gestion-fiches.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { FormAddEditComponent } from 'src/app/intranet/pages/form-add-edit/form-add-edit.component';
import { ModalElementComponent } from 'src/app/shared-components/modal-element/modal-element.component';




@Component({
  selector: 'app-accueil-principal',
  templateUrl: './accueil-principal.component.html',
  styleUrls: ['./accueil-principal.component.scss']
})

export class AccueilPrincipalComponent implements OnInit {


  constructor(public formationService: FormationGetService, private modalService: NgbModal, public gestionService: GestionFichesService, public auth: AuthServiceService, private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.gestionService.someMethod()
  }


  openAddEditFormDialog(element?: any): void { 
    this._dialog.open(FormAddEditComponent,
      {
        width: '600px',
        data: {
          title: `Formulaire de ...`,
          type: 'cet utilisateur',
          data: []
        }
      })
      .afterClosed()
      .subscribe(res => {
        res ? this.deleteUtilisateur() : '';
      });
  }

  deleteUtilisateur(){
    console.log('test modal : Confirmation de la suppression dun utilisateur');
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
