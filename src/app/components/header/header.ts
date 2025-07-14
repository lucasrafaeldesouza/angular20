import { Component } from '@angular/core';
import { SessaoService } from '../../services/sessao-service';
import { Observable } from 'rxjs';
import { Sessao } from '../../models/sessao.model';
import { HeaderService } from '../../services/header-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  public opdusNom: string | undefined;
  
  title = "consolelog-guards";
  sessao$: Observable<Sessao | null>;
  constructor(private sessaoService: SessaoService, private headerService: HeaderService) {
    this.sessao$ = this.sessaoService.getSessao();
    this.opdusNom = this.headerService.obterOpdusNom()
  }

  logout() {
    this.sessaoService.limparSessao();
  }

}
