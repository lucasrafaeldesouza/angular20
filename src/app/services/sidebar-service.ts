import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private opdusCod: number | undefined;

  constructor() {
    const cod = localStorage.getItem('opdusCod');
    this.opdusCod = cod ? parseInt(cod, 10) : undefined;
  }

  itensMenuCtrl(opdusCod: number) {
    this.opdusCod = opdusCod;
    localStorage.setItem('opdusCod', opdusCod.toString());
  }
  obterOpdusCod() {
    return this.opdusCod;
  }
}
