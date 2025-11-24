import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment

  private _httpclient: HttpClient

  constructor(httpClient: HttpClient) { 
    this._httpclient = httpClient
  }
}
