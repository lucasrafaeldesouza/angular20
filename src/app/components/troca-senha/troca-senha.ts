import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { validaSenhaForte } from '../../validators/valida-senha';
import { AuthService } from '../../services/auth-service';
import { HttpClient } from '@angular/common/http';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from '../../services/alert';
import { ProgressBar } from '../progress-bar/progress-bar';

@Component({
  selector: 'app-troca-senha',
  imports: [NgbCollapseModule, ReactiveFormsModule, NgbProgressbarModule, ProgressBar],
  templateUrl: './troca-senha.html',
  styleUrl: './troca-senha.css'
})

export class TrocaSenha {
  @Input() public info: any;

  isCollapsed = true;
  valid_senha = false;
  messageError = '';
  progress = 0;
  progress_bar = false;

  private auth = inject(AuthService);
  private http = inject(HttpClient);
  private snackBar = inject(Alert);

  constructor(public activeModal: NgbActiveModal) { }
  
  ngOnInit() {
  }

  trocaSenhaForm = new FormGroup({
    new_password: new FormControl('', validaSenhaForte()),
    confirm_new_password: new FormControl('', Validators.required),
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

  validSenha() {
      if(this.trocaSenhaForm.value.new_password != this.trocaSenhaForm.value.confirm_new_password) {
        this.valid_senha = true
        this.messageError = 'Nova senha informada está diferente da confirmação!'
        return false;
      }
      const senhaFraca = this.trocaSenhaForm.get('new_password');
      if (senhaFraca?.errors) {
        this.messageError = 'Sua senha está fraca, veja os requisitos minimos abaixo...'
        return false;
      }
      return true
  }
  async troca_senha() {
    this.progress_bar = true
    if (!this.validSenha()) {
      this.valid_senha = true
      return false
    }
    this.valid_senha = false

    const formValue = this.trocaSenhaForm.value;
    const publicKey = await this.auth.importPublicKey(this.pemPublicKey);
    const encryptedPassword = await this.auth.encryptData(publicKey, formValue.new_password!);
    const data = {
      // usisCod: this.info.usisCod,
      usisCod: 51507,
      opdusDscSenha: encryptedPassword
    };
    const dataSave = {
      opdusDscSenha: encryptedPassword
    };

    this.http.post('/rede/apirest/users/validaNovaSenha', data).subscribe((res: any) => {
      if(res.tipo == 'sucesso') {
        this.salvaNovaSenha(dataSave)
      }
    })
    return true
  }
  salvaNovaSenha(dataSave: any) {
    this.progress = 50;
    this.http.post('/rede/apirest/rda02/salvaNovaSenha', dataSave).subscribe((res: any) => {
        if(res.tipo == 'sucesso') {
          this.progress = 100;
          this.activeModal.close()
          this.snackBar.mostrarAlert(res.tipo+'!' , res.mensagem, 'success')
      }
    })
  }

}
