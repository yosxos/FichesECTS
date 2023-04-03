import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationI } from 'src/app/modeles/formation-i';





@Component({
  selector: 'app-modal-formation',
  templateUrl: './modal-formation.component.html',
  styleUrls: ['./modal-formation.component.scss']
})

export class ModalFormationComponent {

  @ViewChild('htmlData') htmlData!: ElementRef;
  @Input() data?: FormationI;

  constructor(public activeModal: NgbActiveModal) {

  }

 /*
  exportDataToPDF() {
    // Creating a unique file name for my PDF
    const fileName = 'ficheEcts_' + this.data?.parcour + '_' + this.data?.niveau + '_' + this.data?.annee + '.pdf';
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    const titleXPos = (doc.internal.pageSize.getWidth() / 2) - (doc.getTextWidth(this.data?.niveau!) / 2);
    doc.text(this.data?.niveau!, titleXPos, 20);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.table(10, 35, this._getDataForPdfTable(), this._createHeadersForPdfTable([
      'parcour', 'annee', 'niveau', 'code'
    ]), { autoSize: false });
    doc.save(fileName);
  }

  private _createHeadersForPdfTable(keys: string[]) {
    const result: CellConfig[] = [];
    for (let i = 0; i < keys.length; i += 1) {
      result.push({
        name: keys[i],
        prompt: keys[i],
        width: 55,
        align: 'center',
        padding: 10
      });
    }
    return result;
  }

  private _getDataForPdfTable() {
    const data = [];
      data.push({
        parcour: this.data?.parcour!,
        annee: this.data?.annee!,
        code: this.data?.code!,
      });
      return data;
    }*/



  }

