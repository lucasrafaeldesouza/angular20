import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Roteamento {

  constructor() { }

  buscaLinkItensMenu(vestrutAcessoUsuarItens: any) {
    vestrutAcessoUsuarItens.forEach((objeto: any) => {
      switch (objeto.eacIdtObjetoSist) {
        case "rdc37":
          objeto.link = "cadastroPaises"
        break;
        case "rdc02":
          objeto.link = "cadastroUF"
        break;
        case "rdc03":
          objeto.link = "cadastroCidade"
        break;
      }
    }) 
  }
}
