import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceCampanhas, Campanha } from '../campanha-service';

@Component({
  selector: 'app-modal-atualizar-campanha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-atualizar-campanha.html',
  styleUrls: ['./modal-atualizar-campanha.css']
})
export class ModalAtualizarCampanhaComponent implements OnInit {
  @Input() campanha!: Campanha;

  @Output() fechar              = new EventEmitter<void>();
  @Output() campanhaAtualizada  = new EventEmitter<Campanha>();

  private svc = inject(ServiceCampanhas);

  salvando  = false;
  erroGeral = '';

  statusOpcoes = [
    { valor: 'ativa',     label: 'Ativa'     },
    { valor: 'inativa',   label: 'Inativa'   },
    { valor: 'expirada', label: 'Expirada' },
  ];

  form: Campanha = {
    titulo: '', descricao: '',
    idCentro: undefined,
    dataInicio: '', dataFim: '',
    status: 'ativa',
  };

  ngOnInit(): void {
    this.form = {
      titulo:     this.campanha.titulo     ?? '',
      descricao:  this.campanha.descricao  ?? '',
      idCentro:   this.campanha.idCentro,
      dataInicio: this.campanha.dataInicio ?? '',
      dataFim:    this.campanha.dataFim    ?? '',
      status:     this.campanha.status     ?? 'ativa',
    };
  }

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
    this.svc.atualizar(this.campanha.id!, this.form).subscribe({
      next: (atualizada) => {
        this.salvando = false;
        this.campanhaAtualizada.emit(atualizada);
        this.fecharModal();
      },
      error: (err) => {
        this.salvando = false;
        this.erroGeral = err?.error?.erro ?? 'Erro ao atualizar. Tente novamente.';
      }
    });
  }
}