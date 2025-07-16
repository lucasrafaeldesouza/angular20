import { Component, inject } from '@angular/core';
import { SessaoService } from '../../services/sessao-service';
import { Observable } from 'rxjs';
import { Sessao } from '../../models/sessao.model';
import { HeaderService } from '../../services/header-service';
import { HttpClient } from '@angular/common/http';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpParams } from '@angular/common/http';

interface Notificacoes {
  fdscTipoOcorr: string;
  dscTitulo: string;
  dscPrestOpdr: string;
}

@Component({
  selector: 'app-header',
  imports: [NgbPopoverModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  private http = inject(HttpClient);
  public opdusNom: string;
  private opdusCod: number;
  public qtd_notification: number = 0;

  title = "consolelog-guards";
  sessao$: Observable<Sessao | null>;
  constructor(private sessaoService: SessaoService, private headerService: HeaderService) {
    this.sessao$ = this.sessaoService.getSessao();
    this.opdusNom = this.headerService.obterOpdusNom()
    this.opdusCod = this.headerService.obterOpdusCod()
    this.obterNotificacoesPendentes(this.opdusCod)
    this.obterNotificacoesPendentesList()
  }

  obterNotificacoesPendentes(opdusCod: number) {
    this.http.get('/rede/apirest/rdr04/obterPendentes/'+opdusCod).subscribe((res: any) => {
      this.qtd_notification = res;
    })
  }

  items: Notificacoes[] = [];

  obterNotificacoesPendentesList() {
    let params = new HttpParams();
    params = params
    .set('search[value]', '')
    .set('columns[5][search][regex]', 'false')
    .set('columns[0][data]', 'ocoCod')
    .set('columns[1][data]', 'tocoCod')
    .set('columns[2][data]', 'ocoDscTitulo')
    .set('columns[3][data]', 'preCod')
    .set('columns[5][search][value]', '')
    .set('columns[2][search][value]', '')
    .set('columns[2][search][regex]', 'false')
    .set('columns[7][name]', '')
    .set('filtros[opdCodCliente]', '')
    .set('columns[6][name]', '')
    .set('order[0][dir]', 'desc')
    .set('columns[7][searchable]', 'true')
    .set('columns[4][name]', '')
    .set('columns[6][searchable]', 'true')
    .set('columns[3][searchable]', 'true')
    .set('columns[2][searchable]', 'true')
    .set('columns[7][data]', '')
    .set('filtros[flgPendente]', this.opdusCod) //
    .set('columns[5][data]', 'ocoIndSituacOcorr')
    .set('columns[4][searchable]', 'true')
    .set('columns[5][searchable]', 'true')
    .set('filtros[tipoprest]', '')
    .set('filtros[opdusCod]', '')
    .set('columns[6][search][value]', '')
    .set('search[regex]', 'false')
    .set('columns[0][searchable]', 'true')
    .set('columns[7][search][regex]', 'false')
    .set('columns[1][searchable]', 'true')
    .set('columns[1][search][regex]', 'false')
    .set('columns[4][search][regex]', 'false')
    .set('order[0][column]', '0')
    .set('columns[0][search][value]', '')
    .set('columns[6][orderable]', 'true')
    .set('columns[7][orderable]', 'false')
    .set('filtros[ocoIndSituacOcorr]', '')
    .set('columns[3][search][value]', '')
    .set('columns[3][orderable]', 'true')
    .set('columns[0][search][regex]', 'false')
    .set('filtros[preCod]', '')
    .set('columns[3][search][regex]', 'false')
    .set('columns[4][orderable]', 'true')
    .set('columns[5][orderable]', 'true')
    .set('filtros[opdepCod]', '')
    .set('filtros[ocoDth]', '')
    .set('columns[6][search][regex]', 'false')
    .set('filtros[tocoCod]', '')
    .set('columns[0][name]', '')
    .set('columns[1][name]', '')
    .set('columns[2][name]', '')
    .set('_', '') //
    .set('columns[7][search][value]', '')
    .set('columns[5][name]', '')
    .set('columns[3][name]', '')
    .set('start', '0')
    .set('length', '30')
    .set('draw', '1')
    .set('columns[4][search][value]', '')
    .set('filtros[opdCod]', '') //
    .set('columns[1][search][value]', '')
    .set('columns[4][data]', 'opdepCod')
    .set('columns[6][data]', 'ocoDth')
    .set('filtros[ocoCod]', '')
    .set('filtros[ocoDscTitulo]', '')
    .set('x', '1')
    .set('columns[2][orderable]', 'true')
    .set('opd_cod', '') //
    .set('columns[0][orderable]', 'true')
    .set('columns[1][orderable]', 'true')
    .set('opdus_cod', this.opdusCod); //
    this.http.get('/rede/apirest/rdr04/listar',{ params }).subscribe((res: any) => {
      this.items = res.data
    })
  }
  get notificacoesTexto(): string {
    if (Array.isArray(this.items) && this.items.length > 0) {
      return this.items.map(item => `<strong>${item.dscTitulo}</strong><br>${item.dscPrestOpdr}<br><a href="">Ver detalhes</a><i class="fal fa-arrow-right" style="margin-left: 4px;"></i><hr>`).join('');
    } else {
      return '<strong>Carregando Ocorrências...</strong>';
    }
  }

  logout() {
    this.sessaoService.limparSessao();
  }

}
