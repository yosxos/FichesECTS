import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationGetService } from 'src/app/services/formation-get.service';
import { GestionFichesService } from 'src/app/services/gestion-fiches.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  constructor(public formationService: FormationGetService, private modalService: NgbModal, public gestionService: GestionFichesService) { }

  ngOnInit(): void {
    this.gestionService.someMethod()
  }

}
