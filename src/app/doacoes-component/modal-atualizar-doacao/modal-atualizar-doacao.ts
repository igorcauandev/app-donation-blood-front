import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceDoacoes, Doacao } from '../doacoes-service';
import { ModalAtualizarDoadorComponent } from '../../doadores-component/modal/modal-atualizar-doador/modal-atualizar-doador';

@Component({
  selector: 'app-modal-atualizar-doacao',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalAtualizarDoadorComponent],
  templateUrl: './modal-atualizar-doacao.html',
  styleUrls: ['./modal-atualizar-doacao.css']
})
export class ModalAtualizarDoacaoComponent implements OnInit {
  @Input() doacao!: Doacao;

  @Output() fechar           = new EventEmitter<void>();
  @Output() doacaoAtualizada = new EventEmitter<Doacao>();

  private svc = inject(ServiceDoacoes);

  salvando  = false;
  erroGeral = '';

  tiposSanguineos = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  modalEditarAberto   = false;
  doacaoParaEditar: Doacao | null = null;

  form: Doacao = {
    idPaciente: 0,
    idCentro:   undefined,
    dataDoacao: '',
    quantidade: undefined,
  };

  ngOnInit(): void {
    this.form = {
      idPaciente: this.doacao.idPaciente,
      idCentro:   this.doacao.idCentro,
      dataDoacao: this.doacao.dataDoacao,
      quantidade: this.doacao.quantidade,
    };
  }

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
    this.svc.atualizar(this.doacao.id!, this.form).subscribe({
      next: (atualizada) => {
        this.salvando = false;
        this.doacaoAtualizada.emit(atualizada);
        this.fecharModal();
      },
      error: (err) => {
        this.salvando = false;
        this.erroGeral = err?.error?.erro ?? 'Erro ao atualizar. Tente novamente.';
      }
    });
  }
}