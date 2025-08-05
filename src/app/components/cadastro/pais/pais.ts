import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Grid, tableColumn } from '../../grid/grid';

@Component({
  selector: 'app-pais',
  imports: [Grid],
  templateUrl: './pais.html',
  styleUrl: './pais.css'
})
export class Pais {
  
  private http = inject(HttpClient);
  public loading = false
  public items = []
  public title = 'Cadastro de Países'
  public buttonTitle = 'Cadastrar País +'
  public link = 'bemVindo / cadastroPaises'

  columnList: tableColumn [] = [
    { 
      fieldName: 'paisCodOfcial',
      headerName: 'Código Oficial'
    },
    { 
      fieldName: 'paisNom',
      headerName: 'Nome'
    },
    { 
      fieldName: 'paisCodDdi',
      headerName: 'Código DDI'
    }
  ]

  constructor() {
    this.buscaPais()
  }

  buscaPais() {

    let params = new HttpParams();

    params = params.set('columns[3][orderable]', "false"),
    params = params.set('columns[0][search][regex]', "false"),
    params = params.set('columns[3][search][regex]', "false"),
    params = params.set('columns[0][data]', "paisCodOfcial"),
    params = params.set('columns[1][data]', "paisNom"),
    params = params.set('columns[2][data]', "paisCodDdi"),
    params = params.set('columns[2][search][regex]', "false"),
    params = params.set('order[0][dir]', "asc"),
    params = params.set('columns[3][searchable]', "true"),
    params = params.set('columns[2][searchable]', "true"),
    params = params.set('start', "0"),
    params = params.set('length', "30"),
    params = params.set('draw', "1"),
    params = params.set('search[regex]', "false"),
    params = params.set('columns[0][searchable]', "true"),
    params = params.set('columns[2][orderable]', "true"),
    params = params.set('columns[1][searchable]', "true"),
    params = params.set('columns[0][orderable]', "true"),
    params = params.set('columns[1][orderable]', "true"),
    params = params.set('columns[1][search][regex]', "false"),
    params = params.set('order[0][column]', "0")

    this.http.post('/rede/apirest/rdc37/listar',params).subscribe((res: any) => {
      this.items = res.data
    })
  }
  onEditPais(data: any) {
    alert('onEdit from pais')
    console.log(data)
  }
  onDeletePais(data: any) {
    alert('onDelete from pais')
    console.log(data)
  }

}
