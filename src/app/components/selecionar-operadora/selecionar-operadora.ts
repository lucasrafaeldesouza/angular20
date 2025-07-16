import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-selecionar-operadora',
  imports: [ReactiveFormsModule],
  templateUrl: './selecionar-operadora.html',
  styleUrl: './selecionar-operadora.css'
})
export class SelecionarOperadora {
  @Input() public info: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.states = this.info
  }
  states = [];
  selecionarOp = new FormGroup({
    state: new FormControl(this.states[3]),
  });

  seleciona_op() {
    // console.log('seleciona_op')
    // console.log(this.selecionarOp.value.state)
  }

}
