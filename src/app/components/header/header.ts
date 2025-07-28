import { Component, inject } from '@angular/core';
import { SessaoService } from '../../services/sessao-service';
import { Observable } from 'rxjs';
import { Sessao } from '../../models/sessao.model';
import { HttpClient } from '@angular/common/http';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpParams } from '@angular/common/http';
import { InfoUserLogin } from '../../services/info-user-login';

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
  constructor(private sessaoService: SessaoService, private infoUserLogin: InfoUserLogin) {
    this.sessao$ = this.sessaoService.getSessao();
    this.opdusNom = this.infoUserLogin.getOpdusNom()
    this.opdusCod = this.infoUserLogin.getOpdusCod()
    this.obterNotificacoesPendentes(this.opdusCod)
    // this.obterNotificacoesPendentesList()
  }

  obterNotificacoesPendentes(opdusCod: number) {
    this.http.get('/rede/apirest/rdr04/obterPendentes/'+opdusCod).subscribe((res: any) => {
      this.qtd_notification = res;
    })
  }

  items: Notificacoes[] = [];

  obterNotificacoesPendentesList() {
    console.log('obterNotificacoesPendentesList')
    let params = new HttpParams();
    params = params.set('search[value]', '')
    params = params.set('columns[5][search][regex]', 'false')
    params = params.set('columns[0][data]', 'ocoCod')
    params = params.set('columns[1][data]', 'tocoCod')
    params = params.set('columns[2][data]', 'ocoDscTitulo')
    params = params.set('columns[3][data]', 'preCod')
    params = params.set('columns[5][search][value]', '')
    params = params.set('columns[2][search][value]', '')
    params = params.set('columns[2][search][regex]', 'false')
    params = params.set('columns[7][name]', '')
    params = params.set('filtros[opdCodCliente]', '')
    params = params.set('columns[6][name]', '')
    params = params.set('order[0][dir]', 'desc')
    params = params.set('columns[7][searchable]', 'true')
    params = params.set('columns[4][name]', '')
    params = params.set('columns[6][searchable]', 'true')
    params = params.set('columns[3][searchable]', 'true')
    params = params.set('columns[2][searchable]', 'true')
    params = params.set('columns[7][data]', '')
    params = params.set('filtros[flgPendente]', this.opdusCod) //
    params = params.set('columns[5][data]', 'ocoIndSituacOcorr')
    params = params.set('columns[4][searchable]', 'true')
    params = params.set('columns[5][searchable]', 'true')
    params = params.set('filtros[tipoprest]', '')
    params = params.set('filtros[opdusCod]', '')
    params = params.set('columns[6][search][value]', '')
    params = params.set('search[regex]', 'false')
    params = params.set('columns[0][searchable]', 'true')
    params = params.set('columns[7][search][regex]', 'false')
    params = params.set('columns[1][searchable]', 'true')
    params = params.set('columns[1][search][regex]', 'false')
    params = params.set('columns[4][search][regex]', 'false')
    params = params.set('order[0][column]', '0')
    params = params.set('columns[0][search][value]', '')
    params = params.set('columns[6][orderable]', 'true')
    params = params.set('columns[7][orderable]', 'false')
    params = params.set('filtros[ocoIndSituacOcorr]', '')
    params = params.set('columns[3][search][value]', '')
    params = params.set('columns[3][orderable]', 'true')
    params = params.set('columns[0][search][regex]', 'false')
    params = params.set('filtros[preCod]', '')
    params = params.set('columns[3][search][regex]', 'false')
    params = params.set('columns[4][orderable]', 'true')
    params = params.set('columns[5][orderable]', 'true')
    params = params.set('filtros[opdepCod]', '')
    params = params.set('filtros[ocoDth]', '')
    params = params.set('columns[6][search][regex]', 'false')
    params = params.set('filtros[tocoCod]', '')
    params = params.set('columns[0][name]', '')
    params = params.set('columns[1][name]', '')
    params = params.set('columns[2][name]', '')
    params = params.set('_', '') //
    params = params.set('columns[7][search][value]', '')
    params = params.set('columns[5][name]', '')
    params = params.set('columns[3][name]', '')
    params = params.set('start', '0')
    params = params.set('length', '30')
    params = params.set('draw', '1')
    params = params.set('columns[4][search][value]', '')
    params = params.set('filtros[opdCod]', '') //
    params = params.set('columns[1][search][value]', '')
    params = params.set('columns[4][data]', 'opdepCod')
    params = params.set('columns[6][data]', 'ocoDth')
    params = params.set('filtros[ocoCod]', '')
    params = params.set('filtros[ocoDscTitulo]', '')
    params = params.set('x', '1')
    params = params.set('columns[2][orderable]', 'true')
    params = params.set('opd_cod', '') //
    params = params.set('columns[0][orderable]', 'true')
    params = params.set('columns[1][orderable]', 'true')
    params = params.set('opdus_cod', this.opdusCod); //
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
