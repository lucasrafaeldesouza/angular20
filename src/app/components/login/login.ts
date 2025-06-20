import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {

    private http = inject(HttpClient);
    
    loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('fYiIFGZxR5uf2/78HE3ON48bs3D45L3Y7ae1LDPLuURYv6uYglBpfeVE5W5KzuElTYLFoYMh1ClZrg6o+JR/HqkHDk5MhX1in3CWFUeXtfHgcXlEGlRdJ6AEfgjmPNZfCEwP3ic/YYmreyOBQ6BhDhISgLAgzr8PBWMoHL2AKBWwhBLfJkzrk/zF3k8C6EJC8Bcf3QaYzJiZmczwGS4A00E9mv1h+oxD30mtbrDvTfljhRBf1+cLFUjv91QNABkhdjloDHB+oS6RVjNaBRLeIvXV5raGrydW4A5CE+senIYOGaRiNRGdMO+Wf8n9pp/qQe9lMWSJAzuHyzrmX9BeeQ==', Validators.required),
      opdusCods: new FormControl(null, Validators.required),
      token: new FormControl(null, Validators.required),
      recaptchaResponse: new FormControl('', Validators.required),
    });

    login() {
      this.http.post('/rede/apirest/users/validaNovo', this.loginForm.value).subscribe((res: any) => {
          console.log(res)
      })
      // const formValue = this.loginForm.value;

      // // Criptografa a senha
      // const encryptedPassword = this.encriptData(formValue.password);

      // // Cria novo objeto com senha criptografada
      // const loginData = {
      //   ...formValue,
      //   password: encryptedPassword
      // };
    }
}
