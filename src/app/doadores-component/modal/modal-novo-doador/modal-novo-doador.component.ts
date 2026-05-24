import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceDoadores } from '../../doadores-service';

export interface NovoDoadorPayload {
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
  selector: 'app-modal-novo-doador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-novo-doador.component.html',
  styleUrls: ['./modal-novo-doador.component.css']
})
export class ModalNovoDoadorComponent {
  @Output() fechar = new EventEmitter<void>();
  @Output() doadorCriado = new EventEmitter<any>();

  private svc = inject(ServiceDoadores);

  salvando = false;
  erroGeral = '';
  abaAtiva: 'pessoal' | 'saude' | 'endereco' = 'pessoal';

  tiposSanguineos = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  generos = ['Masculino', 'Feminino', 'Outro', 'Prefiro não informar'];
  estados = [
    'AC','AL','AP','AM','BA','CE','DF','ES','GO',
    'MA','MT','MS','MG','PA','PB','PR','PE','PI',
    'RJ','RN','RS','RO','RR','SC','SP','SE','TO'
  ];

  form: NovoDoadorPayload = {
    nome: '',
    email: '',
    telefone: '',
    tipoSanguineo: '',
    idade: null,
    genero: '',
    peso: null,
    altura: null,
    dataNascimento: '',
    elegivelParaDoar: true,
    endereco: {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
    }
  };

  get abasValidas(): Record<string, boolean> {
    return {
      pessoal: !!(this.form.nome.trim()),
      saude: true,
      endereco: !!(
        this.form.endereco.rua.trim() &&
        this.form.endereco.cidade.trim() &&
        this.form.endereco.estado
      )
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
    // Adapt form to expected Doador type: convert null idade to undefined
    const payload = {
      ...this.form,
      idade: this.form.idade === null ? undefined : this.form.idade
    } as any;

    this.svc.criar(payload).subscribe({
      next: (resposta: any) => {
        this.salvando = false;
        this.doadorCriado.emit(resposta.paciente ?? resposta);
        this.fecharModal();
      },
      error: (err: any) => {
        this.salvando = false;
        this.erroGeral = err?.error?.erro ?? 'Erro ao salvar. Tente novamente.';
      }
    });
  }
}