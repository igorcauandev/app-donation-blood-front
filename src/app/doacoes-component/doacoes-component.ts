import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceDoacoes, Doacao } from './doacoes-service';
import { ModalNovaDoacaoComponent } from './modal-novo-doacao/modal-novo-doacao';
import { ModalAtualizarDoacaoComponent } from './modal-atualizar-doacao/modal-atualizar-doacao';

@Component({
  selector: 'app-doacoes',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalNovaDoacaoComponent, ModalAtualizarDoacaoComponent],
  templateUrl: './doacoes-component.html',
  styleUrls: ['./doacoes-component.css']
})
export class DoacoesComponent implements OnInit {
  private svc = inject(ServiceDoacoes);
  private cdr = inject(ChangeDetectorRef);

  busca = '';
  doacoes: Doacao[] = [];
  modalAberto = false;

  modalEditarAberto   = false;
  doacaoParaEditar: Doacao | null = null;

  ngOnInit(): void {
    this.svc.listar().subscribe({
      next: (dados) => {
        this.doacoes = dados;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar doações:', err)
    });
  }

  get doacoesFiltradas(): Doacao[] {
    const termo = this.busca.toLowerCase().trim();
    if (!termo) return this.doacoes;
    return this.doacoes.filter(d =>
      String(d.idPaciente).includes(termo) ||
      String(d.idCentro ?? '').includes(termo) ||
      (d.dataDoacao ?? '').toLowerCase().includes(termo)
    );
  }

  formatarData(data: string | undefined): string {
    if (!data) return '—';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  formatarVolume(qtd: number | undefined): string {
    if (qtd == null) return '—';
    return `${qtd} ml`;
  }

  registrarDoacao(): void {
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  aoDoacaoCriada(doacao: Doacao): void {
    this.doacoes = [doacao, ...this.doacoes];
    this.cdr.detectChanges();
  }

  excluirDoacao(id: number | undefined): void {
    if (id == null) return;
    this.svc.excluir(id).subscribe({
      next: () => {
        this.doacoes = this.doacoes.filter(d => d.id !== id);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao excluir:', err)
    });
  }

  // 4. Substituir o editarDoacao e adicionar dois métodos novos
editarDoacao(d: Doacao): void {
  this.doacaoParaEditar  = { ...d };
  this.modalEditarAberto = true;
}

fecharModalEditar(): void {
  this.modalEditarAberto = false;
  this.doacaoParaEditar  = null;
}

aoDoacaoAtualizada(atualizada: Doacao): void {
  this.doacoes = this.doacoes.map(d =>
    d.id === atualizada.id ? { ...d, ...atualizada } : d
  );
  this.cdr.detectChanges();
}

}