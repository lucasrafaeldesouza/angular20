import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home {

    private _snackBar = inject(MatSnackBar);
    private http = inject(HttpClient);

    loginForm = new FormGroup({
      EmailId: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
    });

    login() {
      this.http.post('/api/User/Login', this.loginForm.value).subscribe((res: any) => {
        if(res.result) {
            this._snackBar.open('Seja Bem-Vindo Ao PRIMe!', 'Fechar', {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            duration: 3500
          }); 
        } else {
          this._snackBar.open('Usuario ou Senha Incorreto', 'Fechar', {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            duration: 3500,
          });
        }
      });
      // this.http.post("https://freeapi.miniprojectideas.com/api/User/Login", this.loginForm.value).subscribe((res:any) =>{
      //   if(res.result) {
      //     alert('Login Success')
      //   } else {
      //     alert('UserName or Password is Wrong')
      //   }
      // })
    }
}
