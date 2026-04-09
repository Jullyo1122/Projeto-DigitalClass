import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  nome!: string;
  email!: string;
  senha!: string;
  role!: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  cadastro() {
    const dados = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      role: this.role
    }
    this.authService.cad(dados).subscribe({
      next: (res: any) => {
        alert(res.mensagem || 'Cadastro realizado com sucesso');
      },
      error: (err) => {
        console.log(err);

        if (err.status === 400) {
          alert('Email já cadastrado');
        } else if (err.status === 422) {
          alert('Dados inválidos');
        } else {
          alert('Erro ao conectar com o servidor');
        }
      }
    })
  }
}
