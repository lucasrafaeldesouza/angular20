import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { NgbNavConfig, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { InfoUserLogin } from '../../services/info-user-login';

@Component({
  selector: 'app-ocorrencias',
  imports: [NgbNavModule],
  templateUrl: './ocorrencias.html',
  styleUrl: './ocorrencias.css'
})
export class Ocorrencias {
  private http = inject(HttpClient);
  private opdusCod: number;
  public items = []
  public loading = false

  constructor(private infoUserLogin: InfoUserLogin) {
    this.opdusCod = this.infoUserLogin.getOpdusCod()
    this.buscaOcorrencias()
  }

  buscaOcorrencias() {
    this.loading = true
    let params = new HttpParams();

    params = params.set('columns[5][search][regex]','false'),
    params = params.set('columns[0][data]', 'ocoCod'),
    params = params.set('columns[1][data]', 'ocoDth'),
    params = params.set('columns[2][data]', 'tocoCod'),
    params = params.set('columns[3][data]', 'ocoDscTitulo'),
    params = params.set('columns[2][search][regex]', 'false'),
    params = params.set('order[0][dir]', 'asc'),
    params = params.set('columns[6][searchable]', 'true'),
    params = params.set('columns[3][searchable]', 'true'),
    params = params.set('columns[2][searchable]', 'true'),
    params = params.set('filtros[flgPendente]', this.opdusCod),
    params = params.set('columns[5][data]', 'opdepCod'),
    params = params.set('columns[4][searchable]', 'true'),
    params = params.set('columns[5][searchable]', 'true'),
    params = params.set('search[regex]', 'false'),
    params = params.set('columns[0][searchable]', 'true'),
    params = params.set('columns[1][searchable]', 'true'),
    params = params.set('columns[1][search][regex]', 'false'),
    params = params.set('columns[4][search][regex]', 'false'),
    params = params.set('order[0][column]', '0'),
    params = params.set('columns[6][orderable]', 'true'),
    params = params.set('columns[3][orderable]', 'true'),
    params = params.set('columns[0][search][regex]', 'false'),
    params = params.set('columns[3][search][regex]', 'false'),
    params = params.set('columns[4][orderable]', 'true'),
    params = params.set('columns[5][orderable]', 'true'),
    params = params.set('columns[6][search][regex]', 'false'),
    params = params.set('_', '1753461781452'),
    params = params.set('start', '0'),
    params = params.set('length', '30'),
    params = params.set('draw', '1'),
    params = params.set('columns[4][data]', 'preCod'),
    params = params.set('columns[6][data]', 'ocoIndSituacOcorr'),
    params = params.set('x', '1'),
    params = params.set('columns[2][orderable]', 'true'),
    params = params.set('opd_cod', 'null'),
    params = params.set('columns[0][orderable]', 'true'),
    params = params.set('columns[1][orderable]', 'true'),
    params = params.set('opdus_cod', this.opdusCod)

    this.http.get('/rede/apirest/rdr04/listar',{ params }).subscribe((res: any) => {
      this.items = res.data
      this.loading = false
    })
  }
  getDataFormatada(dataCompleta: string): string {
    if (!dataCompleta) return '';
    const partes = dataCompleta.split(' ');
    return partes.length > 1 ? partes[0].substring(0, 10) : '';
  }

}
