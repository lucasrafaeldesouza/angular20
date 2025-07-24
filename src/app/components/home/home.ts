import { Component } from '@angular/core';
import { Atalhos } from "../atalhos/atalhos";
import { Agenda } from "../agenda/agenda";
import { Relatorios } from "../relatorios/relatorios";

@Component({
  selector: 'app-home',
  imports: [Atalhos, Agenda, Relatorios],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
