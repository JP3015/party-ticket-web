import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvidadoService {
    private apiUrl = 'http://localhost:8080/convidados';

    constructor(
        private http: HttpClient,
    ) {}

    listar(idAniversario: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/listar/${idAniversario}`);
    }

    pesquisar(pesquisa: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/nome/${pesquisa}`);
    }

    criar(convidado: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, convidado);
    }

    editar(convidado: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${convidado.id}`, convidado);
    }

    deletar(id: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}
