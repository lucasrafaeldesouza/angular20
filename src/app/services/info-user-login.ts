import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoUserLogin {

  public parametrosLogin: any
  public opdusNom: string;
  public opdusCod: number;

  constructor() { 
    const nome = localStorage.getItem('opdusNom');
    this.opdusNom = nome ? nome : '';
    const cod = localStorage.getItem('opdusCod');
    this.opdusCod = cod ? parseInt(cod, 10) : 0;
  }

  dadosLogin(parametrosLogin: any) {
    this.opdusNom = parametrosLogin.opdusNom
    localStorage.setItem('opdusNom', parametrosLogin.opdusNom.toString());
    this.opdusCod = parametrosLogin.opdusCod
    localStorage.setItem('opdusCod', parametrosLogin.opdusCod.toString());
  }

  getOpdusNom() {
    return this.opdusNom;
  }
  getOpdusCod() {
    return this.opdusCod;
  }
}
