import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private BaseUrl = 'http://localhost:8000/prof'

  constructor(private http: HttpClient) { }

  getTurmas(): Observable<any> {
    return this.http.get(`${this.BaseUrl}/turmas`);
  }

  cadastrarNotas(data: any): Observable<any> {
    return this.http.post(`${this.BaseUrl}/cadastrar-notas`, data);
  }
}
