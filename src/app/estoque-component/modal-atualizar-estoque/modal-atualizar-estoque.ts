import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceEstoque, Bolsa } from '../estoque-service';

@Component({
  selector: 'app-modal-atualizar-bolsa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-atualizar-estoque.html',
  styleUrls: ['./modal-atualizar-estoque.css']
})
export class ModalAtualizarBolsaComponent implements OnInit {
  @Input() bolsa!: Bolsa;

  @Output() fechar          = new EventEmitter<void>();
  @Output() bolsaAtualizada = new EventEmitter<Bolsa>();

  private svc = inject(ServiceEstoque);

  salvando  = false;
  erroGeral = '';

  tiposSanguineos = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  statusOpcoes = [
    { valor: 'disponivel',  label: 'Disponível'  },
    { valor: 'utilizada',   label: 'Utilizada'   },
    { valor: 'vencida',     label: 'Vencida'     },
    { valor: 'descartada',  label: 'Descartada'  },
  ];

  form: Bolsa = {
    tipoSanguineo: '',
    volume:        null,
    status:        'disponivel',
    dataValidade:  '',
    idPaciente:    null,
    idDoacao:      null,
    idCentro:      null,
  };

  ngOnInit(): void {
    this.form = {
      tipoSanguineo: this.bolsa.tipoSanguineo  ?? '',
      volume:        this.bolsa.volume          ?? null,
      status:        this.bolsa.status          ?? 'disponivel',
      dataValidade:  this.bolsa.dataValidade    ?? '',
      idPaciente:    this.bolsa.idPaciente      ?? null,
      idDoacao:      this.bolsa.idDoacao        ?? null,
      idCentro:      this.bolsa.idCentro        ?? null,
    };
  }

  fecharModal(): void {
    this.fechar.emit();
  }

  salvar(): void {
    this.erroGeral = '';

    if (!this.form.tipoSanguineo) {
      this.erroGeral = 'O tipo sanguíneo é obrigatório.';
      return;
    }

    this.salvando = true;
    this.svc.atualizar(this.bolsa.id!, this.form).subscribe({
      next: (atualizada) => {
        this.salvando = false;
        this.bolsaAtualizada.emit(atualizada);
        this.fecharModal();
      },
      error: (err) => {
        this.salvando = false;
        this.erroGeral = err?.error?.erro ?? 'Erro ao atualizar. Tente novamente.';
      }
    });
  }
}