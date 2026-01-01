import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.api;

  constructor(private http: HttpClient) {}
  login(dados: any) {
    return this.http.post(
      `${this.url}/auth/login`,
      dados
    );
  }
}
