import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Excel } from '../../services/excel';

@Component({
  selector: 'app-exportar',
  imports: [],
  templateUrl: './exportar.html',
  styleUrl: './exportar.css'
})
export class Exportar {
  @Input() public itemsExport: any;
  
  constructor(public activeModal: NgbActiveModal, private excelService: Excel) {}

  ngOnInit() {
  }

  exportAsXLSX(itemsExport: any) {
    this.excelService.exportAsExcelFile(itemsExport, 'sample');
    this.activeModal.close()
  }

}
