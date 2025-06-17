import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Credencial } from '../models/credenciais.models';

@Injectable({
  providedIn: 'root'
})
export class CredenciaisService {

  private url = environment.api

  constructor(private httpClient: HttpClient) {
  }
  obterCredenciais() {
    return this.httpClient.get<Credencial[]>(this.url + '/credenciais')
  }
}
