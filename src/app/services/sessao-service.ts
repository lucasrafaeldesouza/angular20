import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sessao } from '../models/sessao.model';

const CHAVE_ACCESS_TOKEN = "auth";

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  private sessao = new BehaviorSubject<Sessao | null>(null);

  constructor() { 
    this.restaurarSessao();
  }

  restaurarSessao() {
    const jsonSessao = sessionStorage.getItem(
      CHAVE_ACCESS_TOKEN
    );
    if (!jsonSessao) {
      return;
    }
    const dadosSessao: Sessao =JSON.parse(jsonSessao); 
    this.sessao.next(dadosSessao);
  }

  salvarSessao(dadosSessao: Sessao) {
    sessionStorage.setItem(
      CHAVE_ACCESS_TOKEN,
      JSON.stringify(dadosSessao)
    );

    // Dispara um novo valor para
    // quem está "ouvindo" o Observable
    // retornado pelo método getSessao
    this.sessao.next(dadosSessao);
  }

  limparSessao() {
    sessionStorage.clear();
    this.sessao.next(null);
  }

  /**
   * Retorna um Obsersable com os
   * dados da sessão do usuário
   */
  getSessao() {
    return this.sessao.asObservable();
  }

  estaLogado() {
    return this.sessao.value !== null;
  }

}
