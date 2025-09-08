import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AniversarioService {
    private apiUrl = 'http://localhost:8080/aniversarios';
    

    constructor(
        private http: HttpClient,
    ) {}

    listar(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    pesquisar(pesquisa: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/nome/${pesquisa}`);
    }

    criar(aniversario: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, aniversario);
    }

    editar(aniversario: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${aniversario.id}`, aniversario);
    }

    deletar(id: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}
