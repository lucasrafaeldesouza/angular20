import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';
import { Constant } from '../../conststnt';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {

    private _snackBar = inject(MatSnackBar);
    private http = inject(HttpClient);
    
    // encriptData(data: any) {
    //   return CryptoJS.AES.encrypt(data,Constant.EN_KEY).toString();
    // }
    loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('fYiIFGZxR5uf2/78HE3ON48bs3D45L3Y7ae1LDPLuURYv6uYglBpfeVE5W5KzuElTYLFoYMh1ClZrg6o+JR/HqkHDk5MhX1in3CWFUeXtfHgcXlEGlRdJ6AEfgjmPNZfCEwP3ic/YYmreyOBQ6BhDhISgLAgzr8PBWMoHL2AKBWwhBLfJkzrk/zF3k8C6EJC8Bcf3QaYzJiZmczwGS4A00E9mv1h+oxD30mtbrDvTfljhRBf1+cLFUjv91QNABkhdjloDHB+oS6RVjNaBRLeIvXV5raGrydW4A5CE+senIYOGaRiNRGdMO+Wf8n9pp/qQe9lMWSJAzuHyzrmX9BeeQ==', Validators.required),
      opdusCods: new FormControl(null, Validators.required),
      token: new FormControl(null, Validators.required),
      recaptchaResponse: new FormControl('', Validators.required),
    });

    login() {
      // const formValue = this.loginForm.value;

      // // Criptografa a senha
      // const encryptedPassword = this.encriptData(formValue.password);

      // // Cria novo objeto com senha criptografada
      // const loginData = {
      //   ...formValue,
      //   password: encryptedPassword
      // };
      this.http.post('/rede/apirest/users/validaNovo', this.loginForm.value).subscribe((res: any) => {
          console.log(res)
      })
      // this.http.post('/api/User/Login', this.loginForm.value).subscribe((res: any) => {
      //   if(res.result) {
      //       this._snackBar.open('Seja Bem-Vindo Ao PRIMe!', 'Fechar', {
      //       horizontalPosition: 'right',
      //       verticalPosition: 'bottom',
      //       duration: 3500
      //     }); 
      //   } else {
      //     this._snackBar.open('Usuario ou Senha Incorreto', 'Fechar', {
      //       horizontalPosition: 'right',
      //       verticalPosition: 'bottom',
      //       duration: 3500,
      //     });
      //   }
      // });
      // this.http.post("https://freeapi.miniprojectideas.com/api/User/Login", this.loginForm.value).subscribe((res:any) =>{
      //   if(res.result) {
      //     alert('Login Success')
      //   } else {
      //     alert('UserName or Password is Wrong')
      //   }
      // })
    }
}
