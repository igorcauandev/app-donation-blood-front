// doadores-component.ts — com modal integrado
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceDoadores } from './doadores-service';
import { ModalNovoDoadorComponent } from './modal/modal-novo-doador/modal-novo-doador.component';
import { ModalAtualizarDoadorComponent } from './modal/modal-atualizar-doador/modal-atualizar-doador';

export interface Doador {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  tipoSanguineo: string;
  genero: string;
  elegivelParaDoar: boolean;
}

@Component({
  selector: 'app-doadores',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalNovoDoadorComponent, ModalAtualizarDoadorComponent], // ← modal importado
  templateUrl: './doadores-component.html',
  styleUrls: ['./doadores-component.css']
})
export class DoadoresComponent implements OnInit {
  private svc = inject(ServiceDoadores);
  private cdr = inject(ChangeDetectorRef);

  busca = '';
  doadores: Doador[] = [];
  modalAberto = false; // ← controla visibilidade do modal

  modalEditarAberto = false;      // ← ADD
  doadorParaEditar: Doador | null = null; // ← ADD

  ngOnInit(): void {
    this.svc.listar().subscribe({
      next: (dados) => {
        this.doadores = dados as unknown as Doador[];
        this.cdr.detectChanges(); // ← força re-render após dados chegarem
      },
      error: (err) => console.error('Erro ao carregar doadores:', err)
    });
  }

  get doadoresFiltrados(): Doador[] {
    const termo = this.busca.toLowerCase().trim();
    if (!termo) return this.doadores;
    return this.doadores.filter(d =>
      d.nome.toLowerCase().includes(termo) ||
      d.tipoSanguineo.toLowerCase().includes(termo) ||
      d.email.toLowerCase().includes(termo)
    );
  }

  getTipoBgClass(tipo: string): string {
    const map: Record<string, string> = {
      'A+': 'tipo-a-pos', 'A-': 'tipo-a-neg',
      'B+': 'tipo-b-pos', 'B-': 'tipo-b-neg',
      'AB+': 'tipo-ab-pos', 'AB-': 'tipo-ab-neg',
      'O+': 'tipo-o-pos',  'O-': 'tipo-o-neg',
    };
    return map[tipo] ?? 'tipo-default';
  }

  getStatusLabel(elegivel: boolean): string {
    return elegivel ? 'Ativo' : 'Inapto Temporário';
  }

  getStatusClass(elegivel: boolean): string {
    return elegivel ? 'status-ativo' : 'status-inapto';
  }

  // Abre modal
  novoDoador(): void {
    this.modalAberto = true;
    console.log('Abrindo modal para novo doador...');
  }

  // Fecha modal (vindo do EventEmitter do modal)
  fecharModal(): void {
    this.modalAberto = false;
  }

  // Recebe o doador criado e insere no topo da lista
  aoDoadorCriado(doador: Doador): void {
    this.doadores = [doador, ...this.doadores];
  }

   // ← CHANGED: agora abre o modal em vez de só logar
  editarDoador(doador: Doador): void {
    this.doadorParaEditar = { ...doador };
    this.modalEditarAberto = true;
  }

  fecharModalEditar(): void {        // ← ADD
    this.modalEditarAberto = false;
    this.doadorParaEditar = null;
  }

  aoDoadorAtualizado(atualizado: Doador): void { // ← ADD
    this.doadores = this.doadores.map(d =>
      d.id === atualizado.id ? { ...d, ...atualizado } : d
    );
    this.cdr.detectChanges();
  }

  excluirDoador(id: number): void {
    this.svc.excluir(id).subscribe({
      next: () => this.doadores = this.doadores.filter(d => d.id !== id),
      error: (err) => console.error('Erro ao excluir:', err)
    });
  }
}