import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _httpclient: HttpClient

  constructor(httpClient: HttpClient) { 
    this._httpclient = httpClient
  }
}
