import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceCampanhas, Campanha } from '../campanha-service';

@Component({
  selector: 'app-modal-nova-campanha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-nova-campanha.component.html',
  styleUrls: ['./modal-nova-campanha.component.css']
})
export class ModalNovaCampanhaComponent {
  @Output() fechar = new EventEmitter<void>();
  @Output() campanhaCriada = new EventEmitter<Campanha>();

  private svc = inject(ServiceCampanhas);

  salvando = false;
  erroGeral = '';

  statusOpcoes = [
    { valor: 'ativa',     label: 'Ativa'     },
    { valor: 'pausada',   label: 'Pausada'   },
    { valor: 'encerrada', label: 'Encerrada' },
  ];

  form: Campanha = {
    titulo: '',
    descricao: '',
    idCentro: undefined,
    dataInicio: '',
    dataFim: '',
    status: 'ativa',
  };

  fecharModal(): void {
    this.fechar.emit();
  }

  salvar(): void {
    this.erroGeral = '';

    if (!this.form.titulo.trim()) {
      this.erroGeral = 'O título da campanha é obrigatório.';
      return;
    }

    this.salvando = true;
    this.svc.criar(this.form).subscribe({
      next: (resposta) => {
        this.salvando = false;
        this.campanhaCriada.emit(resposta.campanha);
        this.fecharModal();
      },
      error: (err) => {
        this.salvando = false;
        this.erroGeral = err?.error?.erro ?? 'Erro ao salvar. Tente novamente.';
      }
    });
  }
}