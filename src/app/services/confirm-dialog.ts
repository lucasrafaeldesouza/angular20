import { inject, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialog } from '../components/confirm/confirm';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  modalService = inject(NgbModal);

  constructor() {}

  public confirm(title: string,message: string,btnOkText: string = 'OK',btnCancelText: string = 'Cancel',dialogSize: 'sm' | 'lg' | 'md' = 'md'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmDialog, {
      size: dialogSize,
      centered: true,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    return modalRef.result;
  }
}