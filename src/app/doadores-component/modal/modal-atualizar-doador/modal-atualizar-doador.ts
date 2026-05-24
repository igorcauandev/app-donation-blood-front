import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceDoadores } from '../../doadores-service';
import { Doador } from '../../doadores-component';

export interface AtualizarDoadorPayload {
  nome: string;
  email: string;
  telefone: string;
  tipoSanguineo: string;
  idade: number | null;
  genero: string;
  peso: number | null;
  altura: number | null;
  dataNascimento: string;
  elegivelParaDoar: boolean;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}

@Component({
  selector: 'app-modal-atualizar-doador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-atualizar-doador.html',
  styleUrls: ['./modal-atualizar-doador.css']
})
export class ModalAtualizarDoadorComponent implements OnInit {
  // Doador a editar — obrigatório para o modal funcionar
  @Input() doador!: Doador;

  @Output() fechar = new EventEmitter<void>();
  @Output() doadorAtualizado = new EventEmitter<Doador>();

  private svc = inject(ServiceDoadores);

  salvando  = false;
  erroGeral = '';
  abaAtiva: 'pessoal' | 'saude' | 'endereco' = 'pessoal';

  tiposSanguineos = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  generos = ['Masculino', 'Feminino', 'Outro', 'Prefiro não informar'];
  estados = [
    'AC','AL','AP','AM','BA','CE','DF','ES','GO',
    'MA','MT','MS','MG','PA','PB','PR','PE','PI',
    'RJ','RN','RS','RO','RR','SC','SP','SE','TO'
  ];

  form: AtualizarDoadorPayload = {
    nome: '', email: '', telefone: '',
    tipoSanguineo: '', idade: null, genero: '',
    peso: null, altura: null, dataNascimento: '',
    elegivelParaDoar: true,
    endereco: { rua: '', numero: '', bairro: '', cidade: '', estado: '', cep: '' }
  };

  ngOnInit(): void {
    // Pré-preenche o formulário com os dados do doador recebido
    const d = this.doador as any;
    this.form = {
      nome:            d.nome            ?? '',
      email:           d.email           ?? '',
      telefone:        d.telefone        ?? '',
      tipoSanguineo:   d.tipoSanguineo   ?? '',
      idade:           d.idade           ?? null,
      genero:          d.genero          ?? '',
      peso:            d.peso            ?? null,
      altura:          d.altura          ?? null,
      dataNascimento:  d.dataNascimento  ?? '',
      elegivelParaDoar: d.elegivelParaDoar ?? true,
      endereco: {
        rua:    d.endereco?.rua    ?? '',
        numero: d.endereco?.numero ?? '',
        bairro: d.endereco?.bairro ?? '',
        cidade: d.endereco?.cidade ?? '',
        estado: d.endereco?.estado ?? '',
        cep:    d.endereco?.cep    ?? '',
      }
    };
  }

  irParaAba(aba: 'pessoal' | 'saude' | 'endereco'): void {
    this.abaAtiva = aba;
  }

  fecharModal(): void {
    this.fechar.emit();
  }

  salvar(): void {
    this.erroGeral = '';

    if (!this.form.nome.trim()) {
      this.abaAtiva = 'pessoal';
      this.erroGeral = 'O nome do doador é obrigatório.';
      return;
    }

    if (!this.form.endereco.rua.trim() || !this.form.endereco.cidade.trim() || !this.form.endereco.estado) {
      this.abaAtiva = 'endereco';
      this.erroGeral = 'Preencha os campos obrigatórios do endereço (rua, cidade e estado).';
      return;
    }

    this.salvando = true;

    const payload = {
      ...this.form,
      idade: this.form.idade === null ? undefined : this.form.idade,
    } as any;

    // Chama PUT /pacientes/:id
    this.svc.atualizar(this.doador.id, payload).subscribe({
      next: (atualizado: any) => {
        this.salvando = false;
        this.doadorAtualizado.emit(atualizado);
        this.fecharModal();
      },
      error: (err: any) => {
        this.salvando = false;
        this.erroGeral = err?.error?.erro ?? 'Erro ao atualizar. Tente novamente.';
      }
    });
  }
}