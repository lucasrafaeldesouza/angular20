import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private opdusNom: string | undefined;

  constructor() {
    const nome = localStorage.getItem('opdusNom');
    this.opdusNom = nome ? nome : undefined;
  }

  itensHeader(opdusNom: string) {
    this.opdusNom = opdusNom
    localStorage.setItem('opdusNom', opdusNom.toString());
  }
  obterOpdusNom() {
    return this.opdusNom;
  }
}
