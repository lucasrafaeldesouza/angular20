import { Component, inject } from '@angular/core';
import { Grid, tableColumn } from "../../grid/grid";
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfirmDialogService } from '../../../services/confirm-dialog';
import { Alert } from '../../../services/alert';

@Component({
  selector: 'app-uf',
  imports: [Grid],
  templateUrl: './uf.html',
  styleUrl: './uf.css'
})
export class Uf {

    private http = inject(HttpClient);
    public items = []
    public title = 'Cadastro de UFs'
    public buttonTitle = 'Cadastrar Uf +'
    public link = 'bemVindo / cadastroUF'
    
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
    constructor(private ConfirmDialogService: ConfirmDialogService, private snackBar: Alert) {
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
    onEditUf(data: any) {
      alert('onEdit from UFs')
      console.log(data)
    }
    onDeleteUf(data: any) {
      this.ConfirmDialogService.confirm("Confirmação de Exclusão", `Deseja realmente excluir a UF - ${data.fdscUf}?`, "Sim, Quero Excluir", "Cancelar").then((confirmed) => {
        if(confirmed){
          this.http.delete('/rede/apirest/rdc02/excluir/'+data.ufCod).subscribe((res: any) => {
            this.buscaUf()
            this.snackBar.mostrarAlert('Atenção', 'Uf Deletada com Sucesso', 'success')
          })
        }
      })
    }

}
