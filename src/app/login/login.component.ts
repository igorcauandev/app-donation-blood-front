import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario   = '';
  senha     = '';
  erro      = '';
  carregando = false;
  mostrarSenha = false;

  // Credenciais fixas (login "falso" só no front)
  private readonly USUARIO_VALIDO = 'admin';
  private readonly SENHA_VALIDA   = '123456';

  constructor(private router: Router) {}

  entrar(): void {
    this.erro = '';

    if (!this.usuario.trim() || !this.senha.trim()) {
      this.erro = 'Preencha o usuário e a senha.';
      return;
    }

    this.carregando = true;

    // Simula latência de rede
    setTimeout(() => {
      if (
        this.usuario.trim() === this.USUARIO_VALIDO &&
        this.senha === this.SENHA_VALIDA
      ) {
        // Marca como autenticado no sessionStorage
        sessionStorage.setItem('hemolife_auth', 'true');
        this.router.navigate(['/painel']);
      } else {
        this.carregando = false;
        this.erro = 'Usuário ou senha incorretos.';
      }
    }, 900);
  }

  toggleSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }
}