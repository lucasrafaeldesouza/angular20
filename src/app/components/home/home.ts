import { Component } from '@angular/core';
import { SessaoService } from '../../services/sessao-service';
import { Observable } from 'rxjs';
import { Sessao } from '../../models/sessao.model';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  
  title = "consolelog-guards";
  sessao$: Observable<Sessao | null>;
  constructor(private sessaoService: SessaoService) {
    this.sessao$ = this.sessaoService.getSessao();
  }

  logout() {
    this.sessaoService.limparSessao();
  }

}
