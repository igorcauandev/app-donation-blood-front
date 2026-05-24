import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Campanha {
  id?: number;
  titulo: string;
  descricao?: string;
  idCentro?: number;
  dataInicio?: string;
  dataFim?: string;
  status?: string;
  criadoEm?: string;
  atualizadoEm?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ServiceCampanhas {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/campanhas';

  listar(): Observable<Campanha[]> {
    return this.http.get<Campanha[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Campanha> {
    return this.http.get<Campanha>(`${this.apiUrl}/${id}`);
  }

  criar(campanha: Campanha): Observable<{ mensagem: string; campanha: Campanha }> {
    return this.http.post<{ mensagem: string; campanha: Campanha }>(this.apiUrl, campanha);
  }

  atualizar(id: number, campanha: Campanha): Observable<Campanha> {
    return this.http.put<Campanha>(`${this.apiUrl}/${id}`, campanha);
  }

  excluir(id: number): Observable<{ mensagem: string }> {
    return this.http.delete<{ mensagem: string }>(`${this.apiUrl}/${id}`);
  }
}