import { Component } from '@angular/core';
import { SessaoService } from '../../services/sessao-service';
import { Observable } from 'rxjs';
import { Sessao } from '../../models/sessao.model';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  
  title = "consolelog-guards";
  sessao$: Observable<Sessao | null>;
  constructor(private sessaoService: SessaoService) {
    this.sessao$ = this.sessaoService.getSessao();
  }

  logout() {
    this.sessaoService.limparSessao();
  }

}
