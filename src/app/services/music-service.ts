import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private url = environment.api

  constructor(private httpClient: HttpClient) {    
  }
}
