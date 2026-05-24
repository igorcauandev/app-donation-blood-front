import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceEstoque, Bolsa } from './estoque-service';
import { ModalNovoEstoque } from './modal-novo-estoque/modal-novo-estoque';

// Mínimos recomendados por tipo (regra de negócio local)
const MINIMOS: Record<string, number> = {
  'A+': 20, 'A-': 15, 'B+': 15, 'B-': 10,
  'AB+': 10, 'AB-': 8, 'O+': 25, 'O-': 20,
};

// Ordem de exibição dos tipos
const ORDEM_TIPOS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export interface StockCard {
  tipo: string;
  quantidade: number;      // bolsas com status "disponivel"
  minimo: number;
  status: 'Normal' | 'Baixo' | 'Crítico';
  bolsas: Bolsa[];         // todas as bolsas desse tipo
}

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [CommonModule, ModalNovoEstoque],
  templateUrl: './estoque-component.html',
  styleUrls: ['./estoque-component.css']
})
export class EstoqueComponent implements OnInit {
  private svc = inject(ServiceEstoque);
  private cdr = inject(ChangeDetectorRef);

  estoques: StockCard[] = [];
  todasBolsas: Bolsa[] = [];

  // Estado do modal
  modalAberto = false;
  bolsaSelecionada: Bolsa | null = null;
  tipoPreSelecionado = '';

  ngOnInit(): void {
    this.carregarBolsas();
  }

  carregarBolsas(): void {
    this.svc.listar().subscribe({
      next: (bolsas) => {
        this.todasBolsas = bolsas;
        this.estoques = this.agregarPorTipo(bolsas);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar bolsas:', err)
    });
  }

  private agregarPorTipo(bolsas: Bolsa[]): StockCard[] {
    const mapa: Record<string, Bolsa[]> = {};

    // Garante que todos os tipos apareçam mesmo sem bolsas
    for (const tipo of ORDEM_TIPOS) {
      mapa[tipo] = [];
    }

    for (const bolsa of bolsas) {
      const t = bolsa.tipoSanguineo;
      if (!mapa[t]) mapa[t] = [];
      mapa[t].push(bolsa);
    }

    return ORDEM_TIPOS.map(tipo => {
      const todas = mapa[tipo] ?? [];
      const disponiveis = todas.filter(b => b.status === 'disponivel');
      const qtd = disponiveis.length;
      const min = MINIMOS[tipo] ?? 10;

      let status: 'Normal' | 'Baixo' | 'Crítico';
      if (qtd >= min)              status = 'Normal';
      else if (qtd >= min * 0.5)   status = 'Baixo';
      else                         status = 'Crítico';

      return { tipo, quantidade: qtd, minimo: min, status, bolsas: todas };
    });
  }

  get totalUnidades(): number {
    return this.estoques.reduce((acc, e) => acc + e.quantidade, 0);
  }

  get totalBolsas(): number {
    return this.todasBolsas.length;
  }

  getProgressoPercent(item: StockCard): number {
    const max = item.minimo * 4;
    return Math.min((item.quantidade / max) * 100, 100);
  }

  getCardClass(item: StockCard): string {
    if (item.status === 'Crítico') return 'card-critico';
    if (item.status === 'Baixo')   return 'card-baixo';
    return '';
  }

  getStatusClass(item: StockCard): string {
    if (item.status === 'Crítico') return 'status-critico';
    if (item.status === 'Baixo')   return 'status-baixo';
    return 'status-normal';
  }

  getProgressClass(item: StockCard): string {
    if (item.status === 'Crítico') return 'progress-critico';
    if (item.status === 'Baixo')   return 'progress-baixo';
    return 'progress-normal';
  }

  getDropClass(item: StockCard): string {
    if (item.status === 'Baixo')   return 'drop-baixo';
    if (item.status === 'Crítico') return 'drop-critico';
    return 'drop-normal';
  }

  // Abre modal para ADICIONAR bolsa do tipo clicado
  adicionarBolsa(tipo: string): void {
    this.bolsaSelecionada = null;
    this.tipoPreSelecionado = tipo;
    this.modalAberto = true;
  }

  // Abre modal para EDITAR uma bolsa existente (usada dentro do modal de listagem)
  editarBolsa(bolsa: Bolsa): void {
    this.bolsaSelecionada = { ...bolsa };
    this.tipoPreSelecionado = bolsa.tipoSanguineo;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.bolsaSelecionada = null;
    this.tipoPreSelecionado = '';
  }

  aoSalvar(): void {
    this.fecharModal();
    this.carregarBolsas(); // recarrega para refletir mudanças
  }

  disableHeader(){
    ;
  }
}