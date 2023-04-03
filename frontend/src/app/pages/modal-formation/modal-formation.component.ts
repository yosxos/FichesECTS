import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationI } from 'src/app/modeles/formation-i';
import html2canvas from 'html2canvas';
import  jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';





@Component({
  selector: 'app-modal-formation',
  templateUrl: './modal-formation.component.html',
  styleUrls: ['./modal-formation.component.scss']
})

export class ModalFormationComponent implements OnInit {

  @ViewChild('htmlData') htmlData!: ElementRef;
  @Input() data?: FormationI;

  constructor(public activeModal: NgbActiveModal) {
  }
  ngOnInit(): void {
  }

  
  // openPDF(): void {
  //   let DATA: any = document.getElementById('htmlData');
  //   html2canvas(DATA).then((canvas) => {
  //     let fileWidth = 208;
  //     let fileHeight = (canvas.height * fileWidth) / canvas.width;
  //     const FILEURI = canvas.toDataURL('image/png');
  //     let PDF = new jsPDF('p', 'mm', 'a4');
  //     let position = 0;
  //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
  //     PDF.save('ficheEcts_' + this.data?.parcour + '_' + this.data?.niveau + '_' + this.data?.annee + '.pdf');
  //   });
  // }
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
    
      download() {

      const doc = new jsPDF('l', 'mm', 'a4'); 
    
      const head = [['ID', 'Country', 'Index', 'Capital']]
      const data = [
        [1, 'Finland', 7.632, 'Helsinki'],
        [2, 'Norway', 7.594, 'Oslo'],
        [3, 'Denmark', 7.555, 'Copenhagen'],
        [4, 'Iceland', 7.495, 'Reykjavík'],
        [5, 'Switzerland', 7.487, 'Bern'],
        [9, 'Sweden', 7.314, 'Stockholm'],
        [73, 'Belarus', 5.483, 'Minsk'],
    ]
      autoTable(doc, {
        head: head,
        body: data,
        didDrawCell: (data) => { },
    });
      doc.save('dataModel.pdf')
      }
  }

