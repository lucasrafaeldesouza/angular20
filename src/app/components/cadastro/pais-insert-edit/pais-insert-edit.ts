import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Alert } from '../../../services/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pais-insert-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './pais-insert-edit.html',
  styleUrl: './pais-insert-edit.css'
})
export class PaisInsertEdit {
  @Input() public data: any;
  private http = inject(HttpClient);

  constructor(public activeModal: NgbActiveModal, private snackBar: Alert) {}

  ngOnInit() {
    if(this.data) {
      this.dadosPais.patchValue({
        paisCod: this.data.paisCod || '',
        paisCodOfcial: this.data.paisCodOfcial || '',
        paisNom: this.data.paisNom || '',
        paisCodDdi: this.data.paisCodDdi || ''
      });
    }
  }

  dadosPais = new FormGroup({
    paisCod: new FormControl('', Validators.required),
    paisCodOfcial: new FormControl('', Validators.required),
    paisNom: new FormControl('', Validators.required),
    paisCodDdi: new FormControl('', Validators.required),
  });

  inseri_atualiza_pais() {
    this.http.post('/rede/apirest/rdc37/salvar/'+this.dadosPais.value.paisCod, this.dadosPais.value).subscribe((res: any) => {
      console.log(res)
    })
    this.snackBar.mostrarAlert('Atenção', 'País Atualizado com Sucesso', 'success')
    this.activeModal.close()
    location.reload()
  }

}
