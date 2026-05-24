import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, map } from 'rxjs';

export interface ResumoPainel {
  totalDoadores: number;
  doadoresAtivos: number;
  totalBolsas: number;
  bolsasDisponiveis: number;
  totalDoacoes: number;
  totalCampanhas: number;
}

@Injectable({
  providedIn: 'root',
})
export class ServicePainel {
  private http = inject(HttpClient);
  private base = 'http://localhost:5000';

  resumo(): Observable<ResumoPainel> {
    return forkJoin({
      pacientes: this.http.get<any[]>(`${this.base}/pacientes`),
      bolsas:    this.http.get<any[]>(`${this.base}/bolsas`),
      doacoes:   this.http.get<any[]>(`${this.base}/doacoes`),
      campanhas: this.http.get<any[]>(`${this.base}/campanhas`),
    }).pipe(
      map(({ pacientes, bolsas, doacoes, campanhas }) => ({
        totalDoadores:    pacientes.length,
        doadoresAtivos:   pacientes.filter((p: any) => p.elegivelParaDoar).length,
        totalBolsas:      bolsas.length,
        bolsasDisponiveis: bolsas.filter((b: any) => b.status === 'disponivel').length,
        totalDoacoes:     doacoes.length,
        totalCampanhas:   campanhas.length,
      }))
    );
  }
}