import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCampanhas, Campanha } from './campanha-service';
import { ModalNovaCampanhaComponent } from './modal-nova-campanha/modal-nova-campanha.component';

@Component({
  selector: 'app-campanhas',
  standalone: true,
  imports: [CommonModule, ModalNovaCampanhaComponent],
  templateUrl: './campanhas-component.html',
  styleUrls: ['./campanhas-component.css']
})
export class CampanhasComponent implements OnInit {
  private svc = inject(ServiceCampanhas);
  private cdr = inject(ChangeDetectorRef);

  campanhas: Campanha[] = [];
  modalAberto = false;

  ngOnInit(): void {
    this.svc.listar().subscribe({
      next: (dados) => {
        this.campanhas = dados;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar campanhas:', err)
    });
  }

  // Converte 'ativa' → 'status-ativa', 'encerrada' → 'status-encerrada' etc.
  getStatusClass(status: string | undefined): string {
    const s = (status ?? '').toLowerCase();
    if (s === 'ativa')     return 'status-ativa';
    if (s === 'encerrada') return 'status-encerrada';
    return 'status-pausada';
  }

  // Capitaliza o label do status para exibição
  getStatusLabel(status: string | undefined): string {
    const s = (status ?? '').toLowerCase();
    if (s === 'ativa')     return 'Ativa';
    if (s === 'encerrada') return 'Encerrada';
    if (s === 'pausada')   return 'Pausada';
    return status ?? '—';
  }

  // Formata '2025-01-15' → '15/01/2025'
  formatarData(data: string | undefined): string {
    if (!data) return '—';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  novaCampanha(): void {
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  aoCampanhaCriada(campanha: Campanha): void {
    this.campanhas = [campanha, ...this.campanhas];
    this.cdr.detectChanges();
  }

  excluirCampanha(id: number | undefined): void {
    if (id == null) return;
    this.svc.excluir(id).subscribe({
      next: () => {
        this.campanhas = this.campanhas.filter(c => c.id !== id);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao excluir:', err)
    });
  }
}