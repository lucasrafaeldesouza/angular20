import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ ReactiveFormsModule ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

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
