import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-grid',
  imports: [],
  templateUrl: './grid.html',
  styleUrl: './grid.css'
})
export class Grid {
    @Input() columnArray: tableColumn [] = []
    @Input() gridData: any [] = []
}

export interface tableColumn {
  fieldName: string,
  headerName: string
}