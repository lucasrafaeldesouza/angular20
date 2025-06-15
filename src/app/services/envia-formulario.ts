import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviaFormulario {

  constructor() { }

  EnviaInformacaoParaBackend(info: string) {
    alert('enviando informação para o backend via HTTP')
  }
}
