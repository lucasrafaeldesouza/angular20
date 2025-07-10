import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private opdusCod: number | undefined;

  constructor() { }

  itensMenuCtrl(opdusCod: number) {
    this.opdusCod = opdusCod;
  }
  obterOpdusCod() {
    return this.opdusCod;
  }
}
