import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  id!: number;
  senha!: string;
  role: string = "aluno"; // valor padrão
  mensagem: any;

  constructor(private authService: AuthService) {}

  fazerLogin() {
    const dados = {
      id: this.id,
      senha: this.senha,
      role: this.role
    };

    this.authService.login(dados).subscribe({
      next: (res) => {
        this.mensagem = res.mensagem;

        if (res.status === "sucesso") {
          console.log("Logado como:", res.role);
          // Aqui você pode redirecionar conforme role:
          // if (res.role === "aluno") this.router.navigate(['/aluno']);
          // if (res.role === "professor") this.router.navigate(['/prof']);
        }
      },
      error: () => {
        this.mensagem = "Erro no servidor!";
      }
    });
  }
}
