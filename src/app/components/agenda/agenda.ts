import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-agenda',
  imports: [],
  templateUrl: './agenda.html',
  styleUrl: './agenda.css'
})
export class Agenda {
  private http = inject(HttpClient);
  public datasBusca = {
    dataInicial: new Date,
    dataFinal: new Date
  }
  public horarioInicio = ''
  public horarioFim = ''
  public items = []
  constructor() {
    this.setaPrimeiroEUltimoDiaDoMes()
    this.dadosCalendario()
  }

  setaPrimeiroEUltimoDiaDoMes() {
    let dataAuxiliar = new Date();
    var primeiroDia = new Date(dataAuxiliar.getFullYear(), dataAuxiliar.getMonth(), 1);
    var ultimoDia = new Date(dataAuxiliar.getFullYear(), dataAuxiliar.getMonth() + 1, 0);

    this.datasBusca = {
      dataInicial: primeiroDia, 
      dataFinal: ultimoDia
    }
  }

  dadosCalendario() {
    let params = new HttpParams();
    params = params
    .set('filtros[opdCod]', '')
    .set('filtros[dataInicial]', this.datasBusca.dataInicial.toLocaleDateString())
    .set('filtros[dataFinal]', this.datasBusca.dataFinal.toLocaleDateString())
    this.http.get('/rede/apirest/rdr02/listar',{params}).subscribe((res: any) => {
      console.log(res.data)
      this.items = res.data
    })
  }

  getHoraFormatada(dataCompleta: string): string {
    if (!dataCompleta) return '';
    const partes = dataCompleta.split(' ');
    return partes.length > 1 ? partes[1].substring(0, 5) : '';
  }
  getDataFormatada(dataCompleta: string): string {
    const partes = dataCompleta.split(' ');
    if (partes.length < 1) return '';

    const dataStr = partes[0];
    const [dia, mes, ano] = dataStr.split('/').map(Number);
    const data = new Date(ano, mes - 1, dia);
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const diaSemana = diasSemana[data.getDay()];
    const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}`;
    return `${diaSemana}, ${dataFormatada}`;
  }

}
