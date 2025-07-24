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
  public locais: any[] = [];
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
    params = params.set('filtros[opdCod]', '');
    params = params.set('filtros[dataInicial]', this.datasBusca.dataInicial.toLocaleDateString());
    params = params.set('filtros[dataFinal]', this.datasBusca.dataFinal.toLocaleDateString());

    this.http.get('/rede/apirest/rdr02/listar',{params}).subscribe((res: any) => {
      this.buscaLocal(res.data);
      this.items = res.data
    })
  }
  buscaLocal(data: any) {
    data.forEach((objeto: any, index: number) => {
      this.http.get('/rede/apirest/rdr02/obter/' + objeto.eveCod).subscribe((res: any) => {
        const eveDthInicFormat = res.eveDthInicFormat; 
        const eveDthInicFormatDay = eveDthInicFormat.split(' ')[0];
        res.dataOrdenada = this.convertDate(eveDthInicFormatDay);
        this.locais.push(res);

        if (this.locais.length === data.length) {
          this.locais.sort((a, b) => a.dataOrdenada.getTime() - b.dataOrdenada.getTime());
        }
      });
    });
  }
  convertDate(dataStr: string): Date {
    const [dia, mes, ano] = dataStr.split('/');
    return new Date(+ano, +mes - 1, +dia);
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
