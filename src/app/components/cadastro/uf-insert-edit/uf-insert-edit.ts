import { HttpClient } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from '../../../services/alert';

@Component({
  selector: 'app-uf-insert-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './uf-insert-edit.html',
  styleUrl: './uf-insert-edit.css'
})
export class UfInsertEdit {
  @Input() public data: any;
  private http = inject(HttpClient);

  constructor(public activeModal: NgbActiveModal, private snackBar: Alert) {}

  ngOnInit() {
    if(this.data) {
      this.dadosUf.patchValue({
        ufCod: this.data.ufCod,
        ufSig: this.data.ufSig,
        ufNom: this.data.ufNom,
      });
    }
  }

  dadosUf = new FormGroup({
    ufCod: new FormControl('', Validators.required),
    ufSig: new FormControl('', Validators.required),
    ufNom: new FormControl('', Validators.required)
  });

  salva_uf() {
    const body = { ...this.dadosUf.value };
    if (!body.ufCod) {
      delete body.ufCod;
    }
    const ufCod = this.dadosUf.value.ufCod || '';

    this.http.post('/rede/apirest/rdc02/salvar/'+ufCod, body).subscribe((res: any) => {
      this.snackBar.mostrarAlert('Atenção', res.mensagem, 'success')
      this.activeModal.close()
      location.reload()
    })
  }

}
