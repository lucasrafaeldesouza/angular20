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
    @ContentChild('actionsTemplate') actionsTemplate!: TemplateRef<any>;

    constructor(private modalService: NgbModal) {}

    export(data: any, columnArray: any) {
      console.log(data)
      const exportar = this.modalService.open(Exportar);
      exportar.componentInstance.data = data;
      exportar.componentInstance.columnArray = columnArray;
    }
}

export interface tableColumn {
  fieldName: string,
  headerName: string
}