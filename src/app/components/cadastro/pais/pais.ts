import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Grid, tableColumn } from '../../grid/grid';
import { ConfirmDialogService } from '../../../services/confirm-dialog';
import { Alert } from '../../../services/alert';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaisInsertEdit } from '../pais-insert-edit/pais-insert-edit';
import { Exportar } from '../../exportar/exportar';

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
  public itemsExport = []

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

  constructor(private ConfirmDialogService: ConfirmDialogService, private snackBar: Alert, private modalService: NgbModal) {
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

    this.http.post('/rede/apirest/rdc37/listar', params).subscribe((res: any) => {
      this.items = res.data;
      const itemsExport = res.data.map((item: any) => {
        return {
          'Código Oficial': item.paisCodOfcial,
          'Nome': item.paisNom,
          'Código DDI': item.paisCodDdi
        };
      });
      this.itemsExport = itemsExport;
    });

  }
  onEditPais(data: any) {
    const editPais = this.modalService.open(PaisInsertEdit);
    editPais.componentInstance.data = data;
    editPais.componentInstance.refreshList = () => this.buscaPais();
  }
  onDeletePais(data: any) {
    this.ConfirmDialogService.confirm("Confirmação de Exclusão", `Deseja realmente excluir o País - ${data.fdscPais}?`, "Sim, Quero Excluir", "Cancelar").then((confirmed) => {
      if(confirmed){
        this.http.delete('/rede/apirest/rdc37/excluir/'+data.paisCod).subscribe((res: any) => {
          this.buscaPais()
          this.snackBar.mostrarAlert('Atenção', 'País Deletado com Sucesso', 'success')
        })
      }
    })
  }

}
