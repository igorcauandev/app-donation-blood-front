import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EstoqueComponent } from '../estoque-component/estoque-component';

const MINIMOS: Record<string, number> = {
  'A+': 20, 'A-': 15, 'B+': 15, 'B-': 10,
  'AB+': 10, 'AB-': 8, 'O+': 25, 'O-': 20,
};

@Component({
  selector: 'app-painel-controle',
  standalone: true,
  imports: [CommonModule, EstoqueComponent, RouterLink],
  templateUrl: './painel-controle.html',
  styleUrls: ['./painel-controle.css']
})
export class PainelComponent implements OnInit {
  private http   = inject(HttpClient);
  private router = inject(Router);
  private cdr    = inject(ChangeDetectorRef);

  private base = 'http://localhost:5000';

  // Cards de resumo
  doadoresAtivos    = 0;
  totalCadastrados  = 0;
  bolsasDisponiveis = 0;
  totalBolsas       = 0;
  totalDoacoes      = 0;
  totalCampanhas    = 0;

  // Alerta crítico
  criticalCount = 0;
  criticalTypes = '';

  carregando = true;

  ngOnInit(): void {
    forkJoin({
      pacientes: this.http.get<any[]>(`${this.base}/pacientes`),
      bolsas:    this.http.get<any[]>(`${this.base}/bolsas`),
      doacoes:   this.http.get<any[]>(`${this.base}/doacoes`),
      campanhas: this.http.get<any[]>(`${this.base}/campanhas`),
    }).subscribe({
      next: ({ pacientes, bolsas, doacoes, campanhas }) => {
        // Resumo
        this.totalCadastrados  = pacientes.length;
        this.doadoresAtivos    = pacientes.filter(p => p.elegivelParaDoar).length;
        this.totalBolsas       = bolsas.length;
        this.bolsasDisponiveis = bolsas.filter((b: any) => b.status === 'disponivel').length;
        this.totalDoacoes      = doacoes.length;
        this.totalCampanhas    = campanhas.length;

        // Alerta — agrupa bolsas disponíveis por tipo e compara com mínimos
        const contagem: Record<string, number> = {};
        for (const b of bolsas) {
          if (b.status === 'disponivel') {
            contagem[b.tipoSanguineo] = (contagem[b.tipoSanguineo] ?? 0) + 1;
          }
        }

        const criticos = Object.entries(MINIMOS)
          .filter(([tipo, min]) => (contagem[tipo] ?? 0) < min)
          .map(([tipo]) => tipo);

        this.criticalCount = criticos.length;
        this.criticalTypes = criticos.join(', ');

        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar painel:', err);
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  irParaCampanhas(): void {
    this.router.navigate(['/campanhas']);
  }
}