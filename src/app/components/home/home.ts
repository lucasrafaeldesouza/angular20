import { Component } from '@angular/core';
import { Atalhos } from "../atalhos/atalhos";
import { Agenda } from "../agenda/agenda";

@Component({
  selector: 'app-home',
  imports: [Atalhos, Agenda],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
