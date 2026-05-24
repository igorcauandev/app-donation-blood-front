import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceDoacoes, Doacao } from '../doacoes-service';

@Component({
  selector: 'app-modal-nova-doacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-novo-doacao.html',
  styleUrls: ['./modal-novo-doacao.css']
})
export class ModalNovaDoacaoComponent {
  @Output() fechar = new EventEmitter<void>();
  @Output() doacaoCriada = new EventEmitter<Doacao>();

  private svc = inject(ServiceDoacoes);

  salvando = false;
  erroGeral = '';

  form: Doacao = {
    idPaciente: 0,
    idCentro: undefined,
    dataDoacao: '',
    quantidade: undefined,
  };

  fecharModal(): void {
    this.fechar.emit();
  }

  salvar(): void {
    this.erroGeral = '';

    if (!this.form.idPaciente || this.form.idPaciente <= 0) {
      this.erroGeral = 'O ID do paciente é obrigatório e deve ser maior que zero.';
      return;
    }

    if (!this.form.dataDoacao) {
      this.erroGeral = 'A data da doação é obrigatória.';
      return;
    }

    this.salvando = true;
    this.svc.criar(this.form).subscribe({
      next: (resposta) => {
        this.salvando = false;
        this.doacaoCriada.emit(resposta.doacao);
        this.fecharModal();
      },
      error: (err) => {
        this.salvando = false;
        this.erroGeral = err?.error?.erro ?? 'Erro ao salvar. Tente novamente.';
      }
    });
  }
}