import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm.html',
  styleUrl: './confirm.css'
})
export class ConfirmDialog {
  @Input() title: string | undefined;
  @Input() message: string | undefined;
  @Input() btnOkText: string | undefined;
  @Input() btnCancelText: string | undefined;

  activeModal = inject(NgbActiveModal);

  ngOnInit(): void {}

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
