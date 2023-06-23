import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormationComponent } from '../modal-formation/modal-formation.component';
import { FormationGetService } from 'src/app/services/formation-get.service';
import { GestionFichesService } from 'src/app/services/gestion-fiches.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { FormAddEditComponent } from 'src/app/intranet/pages/form-add-edit/form-add-edit.component';
import { FormationI } from 'src/app/modeles/formation-i';
import { UserI } from 'src/app/modeles/user-i';
import { UserServiceService } from 'src/app/services/user-service.service';




@Component({
  selector: 'app-accueil-principal',
  templateUrl: './accueil-principal.component.html',
  styleUrls: ['./accueil-principal.component.scss']
})

export class AccueilPrincipalComponent implements OnInit {


  allformation!: FormationI;
  user: UserI = <UserI>{};
  searchText = '';
  constructor(public formationService: FormationGetService, private modalService: NgbModal, public gestionService: GestionFichesService, public authService: AuthService, private _dialog: MatDialog,public userService:UserServiceService) {
  }

  async ngOnInit(): Promise<void> {
    this.gestionService.someMethod();
    const userId = localStorage.getItem('userId');
    if(userId !== null) {
      const userId = localStorage.getItem('userId');
      if (userId) {
       await this.userService.getUserById(userId);
       this.user = this.userService.user;
      }
    }
    else {
      this.user=this.authService.userId;
    }


  }

  /** TODOO alerte en cas de manque de donnée ! */
  openModal(id : number) {

    this.gestionService.getFormationUeById(id);
    const modalRef = this.modalService.open(ModalFormationComponent);
    //modalRef.componentInstance.data = this.formationService.listeFormations.find(formation => formation.id === id);
  }

  connected() : boolean {
    return this.authService.connected();
  }
  isEditable(formationId: number): boolean {
    
    if(this.user.status === "admin") return true;
    if (typeof this.user.status === 'object' && 'formations' in this.user.status) {
      return this.user.status.formations.some(formation => formation.id === formationId);
    }
    return false;
  }
 
  supprimerFormation(id: number): void {
    this.formationService.deleteFormation(id);
    const index = this.formationService.listeFormations.findIndex(item => item.id === id);
    if (index !== -1) {
      this.formationService.listeFormations.splice(index, 1);
    }
  }


}
