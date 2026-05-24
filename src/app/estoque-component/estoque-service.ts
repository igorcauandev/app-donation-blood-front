import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface espelha exatamente o que a API /bolsas retorna
export interface Bolsa {
  id?: number;
  idPaciente?: number | null;
  idDoacao?: number | null;
  idCentro?: number | null;
  tipoSanguineo: string;
  volume?: number | null;
  status?: string;
  dataValidade?: string;
  criadoEm?: string;
  atualizadoEm?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ServiceEstoque {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/bolsas';

  listar(): Observable<Bolsa[]> {
    return this.http.get<Bolsa[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Bolsa> {
    return this.http.get<Bolsa>(`${this.apiUrl}/${id}`);
  }

  criar(bolsa: Bolsa): Observable<{ mensagem: string; bolsa: Bolsa }> {
    return this.http.post<{ mensagem: string; bolsa: Bolsa }>(this.apiUrl, bolsa);
  }

  atualizar(id: number, bolsa: Bolsa): Observable<Bolsa> {
    return this.http.put<Bolsa>(`${this.apiUrl}/${id}`, bolsa);
  }

  excluir(id: number): Observable<{ mensagem: string }> {
    return this.http.delete<{ mensagem: string }>(`${this.apiUrl}/${id}`);
  }
}