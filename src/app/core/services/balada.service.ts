import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaladaService {
    private apiUrl = 'http://localhost:8080/baladas';

    constructor(
        private http: HttpClient
    ) {}

    listar(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    pesquisar(pesquisa: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/nome/${pesquisa}`);
    }

    criar(balada: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, balada);
    }

    editar(balada: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${balada.id}`, balada);
    }

    deletar(id: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}
