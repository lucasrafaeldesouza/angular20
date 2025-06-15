import { Component, inject } from '@angular/core';
import { EnviaFormulario } from '../../services/envia-formulario';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private EnviaFormulario = inject(EnviaFormulario)
  listItens = ['Lucas', 'Rafael', 'De', 'Souza']
  submit() {
    this.EnviaFormulario.EnviaInformacaoParaBackend("enviando do home")
  }

}
