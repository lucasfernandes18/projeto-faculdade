import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Aluno } from '../core/models/aluno.model';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  alunoUrl: string = '';

  constructor(private http: HttpClient) {
    this.alunoUrl =
      'https://683b8e0728a0b0f2fdc4ec48.mockapi.io/Aluno';
  }

  listar(): Promise<any> {
    return firstValueFrom(this.http.get(this.alunoUrl)).then(
      (response: any) => {
        return response;
      }
    );
  }

  adicionar(obj: Aluno): Promise<Aluno> {
    return firstValueFrom(this.http.post<Aluno>(this.alunoUrl, obj));
  }

  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.alunoUrl}/${id}`)).then(
      (response) => response as any
    );
  }

  atualizar(obj: Aluno): Promise<Aluno> {
    return firstValueFrom(
      this.http.put<Aluno>(`${this.alunoUrl}/${obj.idaluno}`, obj)
    ).then((response) => response as Aluno);
  }
}