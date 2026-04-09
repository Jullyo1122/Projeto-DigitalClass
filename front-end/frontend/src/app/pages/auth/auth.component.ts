import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  nome!: string;
  email!: string;
  senha!: string;
  role!: string;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(){
    const dados = {
      email: this.email,
      senha: this.senha,
      role: this.role
    };
    this.authService.login(dados).subscribe({
      next: (res: any) => {
        if (res.access_token) {
          localStorage.setItem('access_token', res.access_token);
          if (res.role === 'A') {

            this.router.navigate(['/homealuno']);
            alert('Login realizado com sucesso 🚀');
          } else if (res.role === 'P') {
            this.router.navigate(['/catalogocursos']);
            alert('Login realizado com sucesso 🚀');
          }
        } else {
          alert(res.mensagem);
        }
      },
      error: () => {
        alert('Erro ao conectar com o servidor');
      }
    }); 
  }
}
