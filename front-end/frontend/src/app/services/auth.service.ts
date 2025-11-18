import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8000/auth';

  constructor(private http: HttpClient) { }
  
  login(dados: { id: number; senha: string; role: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, dados);
  }

  cadastro(dados: { email: string; senha: string; id: number; role: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/cadastro`, dados);
  }
}
