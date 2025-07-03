import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-aceita-termos',
  imports: [],
  templateUrl: './aceita-termos.html',
  styleUrl: './aceita-termos.css'
})
export class AceitaTermos {
  @Input() public info: any;
  
  public textoTermoUso = '';
  public versaoTermoUso = '';
  public opcaoTermoUso = '';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.textoTermoUso = this.info.textoTermoUso;
    this.versaoTermoUso = this.info.versaoTermoUso;
    this.opcaoTermoUso = this.info.opcaoTermoUso;
  }

}
