import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dois-fatores',
  imports: [],
  templateUrl: './dois-fatores.html',
  styleUrl: './dois-fatores.css'
})
export class DoisFatores {
  @Input() public info: any;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }
}
