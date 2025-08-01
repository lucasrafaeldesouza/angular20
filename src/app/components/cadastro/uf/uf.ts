import { Component, inject } from '@angular/core';
import { Grid, tableColumn } from "../../grid/grid";
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-uf',
  imports: [Grid],
  templateUrl: './uf.html',
  styleUrl: './uf.css'
})
export class Uf {

    private http = inject(HttpClient);
    public items = []
    
    columnList: tableColumn [] = [
      { 
        fieldName: 'ufSig',
        headerName: 'Sigla UF'
      },
      { 
        fieldName: 'ufNom',
        headerName: 'Nome UF'
      }
    ]
    constructor() {
      this.buscaUf()
    }

    buscaUf() {
      let params = new HttpParams();
      params = params.set('columns[0][search][regex]', 'false'),
      params = params.set('columns[0][data]', 'ufSig'),
      params = params.set('columns[1][data]', 'ufNom'),
      params = params.set('columns[2][search][regex]', 'false'),
      params = params.set('order[0][dir]', 'asc'),
      params = params.set('columns[2][searchable]', 'true'),
      params = params.set('start', '0'),
      params = params.set('length', '30'),
      params = params.set('draw', '1'),
      params = params.set('search[regex]', 'false'),
      params = params.set('columns[0][searchable]', 'true'),
      params = params.set('columns[2][orderable]', 'false'),
      params = params.set('columns[1][searchable]', 'true'),
      params = params.set('columns[0][orderable]', 'true'),
      params = params.set('columns[1][orderable]', 'true'),
      params = params.set('columns[1][search][regex]', 'false'),
      params = params.set('order[0][column]', '0')

      this.http.post('/rede/apirest/rdc02/listar',params).subscribe((res: any) => {
        this.items = res.data
      })

    }

}
