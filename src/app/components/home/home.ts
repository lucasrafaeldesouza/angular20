import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Credencial } from '../../models/credenciais.models';
import { CredenciaisService } from '../../services/credenciais-service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

    credenciais = new Observable<Credencial[]>()
    
    constructor (private credenciaisService: CredenciaisService) {
      console.log('home.ts')
      console.log(environment.api)
      this.obterCredenciaisCadastradas()
    }

    obterCredenciaisCadastradas() {
      this.credenciais = this.credenciaisService.obterCredenciais()
    }

    loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
    login() {
      // CALL API with username and password
      console.log(this.loginForm.value);
      if (this.loginForm.invalid) return;
      const formValues = this.loginForm.value;
    }
}
