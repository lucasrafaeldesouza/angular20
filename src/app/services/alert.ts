import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../components/alert-component/alert-component';

@Injectable({
  providedIn: 'root'
})
export class Alert {

  constructor(private snackBar: MatSnackBar) { }

  mostrarAlert(title: string, message: string, messageType: 'warning' | 'error' | 'success') {
    this.snackBar.openFromComponent(AlertComponent,{
      data: {
        title: title,
        message: message
      },
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: messageType
    });
  }
}
