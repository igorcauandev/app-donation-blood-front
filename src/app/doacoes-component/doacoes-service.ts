import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Doacao {
  id?: number;
  idPaciente: number;
  idCentro?: number;
  dataDoacao: string;
  quantidade?: number;
  criadoEm?: string;
  atualizadoEm?: string;
}

@Injectable({
  providedIn: 'root',
})

export class ServiceDoacoes {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/doacoes';

  listar(): Observable<Doacao[]> {
    return this.http.get<Doacao[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Doacao> {
    return this.http.get<Doacao>(`${this.apiUrl}/${id}`);
  }

  criar(doacao: Doacao): Observable<{ mensagem: string; doacao: Doacao }> {
    return this.http.post<{ mensagem: string; doacao: Doacao }>(this.apiUrl, doacao);
  }

  atualizar(id: number, doacao: Doacao): Observable<Doacao> {
    return this.http.put<Doacao>(`${this.apiUrl}/${id}`, doacao);
  }

  excluir(id: number): Observable<{ mensagem: string }> {
    return this.http.delete<{ mensagem: string }>(`${this.apiUrl}/${id}`);
  }
}