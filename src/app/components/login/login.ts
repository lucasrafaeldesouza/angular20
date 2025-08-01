import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth-service';
import { Alert } from '../../services/alert';
import { TrocaSenha } from "../troca-senha/troca-senha";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelecionarOperadora } from '../selecionar-operadora/selecionar-operadora';
import { AceitaTermos } from '../aceita-termos/aceita-termos';
import { DoisFatores } from '../dois-fatores/dois-fatores';
import { Router } from '@angular/router';
import { SessaoService } from '../../services/sessao-service';
import { InfoUserLogin } from '../../services/info-user-login';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {

    private http = inject(HttpClient);
    private auth = inject(AuthService);

    constructor(private snackBar: Alert, private troca_senha: NgbModal, private modalService: NgbModal, private router: Router, private sessaoService: SessaoService, 
      private infoUserLoginService: InfoUserLogin) {
      this.sessaoService.limparSessao()
    }
    
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

    public info = {
      usisCod: '',
      token: ''
    }
    public resposta = {
        accessToken: '',
    }
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
          const tipo = res.tipo;
          this.info = {
            usisCod: res.parametros.usisCod,
            token: res.parametros.token
          }
          this.resposta = {
              accessToken: res.parametros.usisCod,
          }
          switch (tipo) {
            case "critica":
              this.snackBar.mostrarAlert('Atenção', res.mensagem, 'warning')
            break;
            case "TROCA_SENHA":
              const modalTrocaSenha = this.modalService.open(TrocaSenha);
              modalTrocaSenha.componentInstance.info = this.info;
            break;
            case "SELECIONA_OPERADORA":
              const modalSelecionarOperadora = this.modalService.open(SelecionarOperadora);
              modalSelecionarOperadora.componentInstance.info = JSON.parse(res.parametros.dadosDeLogin);
            break;
            case "erro":
              this.snackBar.mostrarAlert('Erro ao realizar a operação', res.mensagem, 'error')
            break;
            case "ACEITA_TERMOS":
              const modalAceitaTermos = this.modalService.open(AceitaTermos);
              modalAceitaTermos.componentInstance.info = res.parametros;
            break;
            case "VALIDA_EMAIL":
              const modalDoisFatores = this.modalService.open(DoisFatores);
              modalDoisFatores.componentInstance.info = res.parametros;
            break;
            default:
              this.sessaoService.salvarSessao(this.resposta);
              this.infoUserLoginService.dadosLogin(res.parametros);
              this.router.navigate(['/bemVindo']);
          }
      })
    }
}
