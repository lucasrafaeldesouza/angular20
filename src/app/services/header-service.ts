import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private opdusNom: string;
  private opdusCod: number;

  constructor() {
    const nome = localStorage.getItem('opdusNom');
    this.opdusNom = nome ? nome : '';
    const cod = localStorage.getItem('opdusCod');
    this.opdusCod = cod ? parseInt(cod, 10) : 0;
  }

  itensHeader(opdusNom: string, opdusCod: number) {
    this.opdusNom = opdusNom
    localStorage.setItem('opdusNom', opdusNom.toString());
    this.opdusCod = opdusCod
    localStorage.setItem('opdusCod', opdusCod.toString());
  }
  obterOpdusNom() {
    return this.opdusNom;
  }
  obterOpdusCod() {
    return this.opdusCod;
  }
}
