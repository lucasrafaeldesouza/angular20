import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';
import { Constant } from '../../conststnt';

@Component({
  selector: 'app-home',
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home {

    private _snackBar = inject(MatSnackBar);
    private http = inject(HttpClient);
    
    // encriptData(data: any) {
    //   return CryptoJS.AES.encrypt(data,Constant.EN_KEY).toString();
    // }
    loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('SbDgIj+ezs98k3U5NwHEryHmpCzEIqZuSmmGiLRN7SjrAYPyj0OLV5kTn2pXHgprGWcEpDhRdwprQdS0PEgUpiW42kF+Q+AOGNwGLXUlJ6EEWlm3HYHOoUqhA7LG+uEQsU9lcYx/gJ5mBFKufvV4pTDcRD9+97jErXfUu236D52RpH37k6YejZSopWEhsc23yjca3tSVkuZDuQjfRbYSDAoQn65+6+nFPiLL3PYVPafdaZxfm1THecQuL+uuGO5ucJ11DpdKNxaXMLRntSaOtsehVKsWcD6QqOGjCnjKfV8i5+eTCdFPds6iDw7BPxbOlcpAoOuhNUmJnw0RKC+0fg==', Validators.required),
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
