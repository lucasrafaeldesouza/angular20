import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-troca-senha',
  imports: [NgbCollapseModule],
  templateUrl: './troca-senha.html',
  styleUrl: './troca-senha.css'
})

export class TrocaSenha {
	isCollapsed = true;

  constructor(public activeModal: NgbActiveModal) { }

}
