import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth-service';
import { Alert } from '../../services/alert';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {

    private http = inject(HttpClient);
    private auth = inject(AuthService);

    constructor(private snackBar: Alert) {}
    
    loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      opdusCods: new FormControl(null, Validators.required),
      token: new FormControl(null, Validators.required),
      recaptchaResponse: new FormControl('', Validators.required),
    });

    // Chave pública PEM
    pemPublicKey = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsQecxIHHp8T3P2QRsPGd
    tCFnAdEpgG0WCFMp36kZQqqSn8q6ZB+89PZ1S6cUp6kUtUyeuI3vOoy1S87f0M2a
    ojiXAgJ5x7apJhkII5PU3blQpWE+NHxCbRlGbYj435ar+mp22opl8HlDxW9wLyNF
    biwewmJWGVwqKviur7rJY1r9u+I4KJmjbPB5KeQ4WGxQM7ImCJyEMzL4xgbWPK/5
    Y2uTrazlpcNFP3jpLekg31H3PytJs+t/YEe43THm8AzW70Af3Q5mEP260mMwxtcX
    cX3KFLiLcnRsUDVTKUFHAck0HzOhZYCj5CrdDxhvkTVATF0s8OfLxA5rGM7kG8Xs
    iwIDAQAB
    -----END PUBLIC KEY-----`;

    async login() {
      const formValue = this.loginForm.value;
      const publicKey = await this.auth.importPublicKey(this.pemPublicKey);
      const encryptedPassword = await this.auth.encryptData(publicKey, formValue.password!);
      const loginData = {
        ...formValue,
        password: encryptedPassword
      };
      this.http.post('/rede/apirest/users/validaNovo', loginData).subscribe((res: any) => {
          console.log(res)
          const tipo = 'TROCA_SENHA';
          switch (tipo) {
            // case "critica":
            //   console.log("critica");
            //   this.snackBar.mostrarAlert('Atenção', res.mensagem, 'warning')
            // break;
            case "TROCA_SENHA":
              console.log("TROCA_SENHA");
            break;
            // case "SELECIONA_OPERADORA":
            //   console.log("SELECIONA_OPERADORA");
            // break;
            // case "erro":
            //   console.log("erro");
            //   this.snackBar.mostrarAlert('Erro ao realizar a operação', res.mensagem, 'error')
            // break;
            // case "ACEITA_TERMOS":
            //   console.log("ACEITA_TERMOS");
            // break;
            // case "VALIDA_EMAIL":
            //   console.log("VALIDA_EMAIL");
            break;
            default:
              console.log("login");
              this.snackBar.mostrarAlert('Bem Vindo', res.mensagem, 'success')
          }
      })
    }
}
