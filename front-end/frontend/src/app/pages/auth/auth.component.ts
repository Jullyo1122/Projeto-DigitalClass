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
  id!: number;
  senha!: string;
  role!: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(){
    const dados = {
      id: this.id,
      senha: this.senha,
      role: this.role
    };
    this.authService.login(dados).subscribe({
      next: (res: any) => {
        if (res.status === 'sucesso') {
          if (res.role === 'A') {
            this.router.navigate(['/homealuno']);
          } else if (res.role === 'P') {
            this.router.navigate(['/catalogocursos']);
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
