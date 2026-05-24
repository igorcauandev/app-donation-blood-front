import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Doador {
  id?: number;
  nome: string;
  email?: string;
  telefone?: string;
  tipoSanguineo?: string;
  idade?: number;
  genero?: string;
  peso?: number;
  altura?: number;
  dataNascimento?: string;
  elegivelParaDoar?: boolean;
  endereco: {
    rua?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
  };
  criadoEm?: string;
  atualizadoEm?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ServiceDoadores {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/pacientes';

  listar(): Observable<Doador[]> {
    return this.http.get<Doador[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Doador> {
    return this.http.get<Doador>(`${this.apiUrl}/${id}`);
  }

  criar(doador: Doador): Observable<{ mensagem: string; paciente: Doador }> {
    return this.http.post<{ mensagem: string; paciente: Doador }>(this.apiUrl, doador);
  }

  atualizar(id: number, doador: Doador): Observable<Doador> {
    return this.http.put<Doador>(`${this.apiUrl}/${id}`, doador);
  }

  excluir(id: number): Observable<{ mensagem: string }> {
    return this.http.delete<{ mensagem: string }>(`${this.apiUrl}/${id}`);
  }
}