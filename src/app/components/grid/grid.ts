import { Component, ContentChild, Input, Output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

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
}

export interface tableColumn {
  fieldName: string,
  headerName: string
}