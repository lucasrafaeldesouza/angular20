import { Component, ContentChild, Input, Output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Exportar } from '../exportar/exportar';

@Component({
  selector: 'app-grid',
  imports: [NgTemplateOutlet],
  templateUrl: './grid.html',
  styleUrl: './grid.css'
})
export class Grid {
    @Input() columnArray: tableColumn [] = []
    @Input() gridData: any [] = []
    @Input() itemsExport: any [] = []
    @ContentChild('actionsTemplate') actionsTemplate!: TemplateRef<any>;

    constructor(private modalService: NgbModal) {}

    export(itemsExport: any) {
      const exportar = this.modalService.open(Exportar);
      exportar.componentInstance.itemsExport = itemsExport;
    }
}

export interface tableColumn {
  fieldName: string,
  headerName: string
}