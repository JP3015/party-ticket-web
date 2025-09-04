import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
    private apiUrl = 'http://localhost:8080/compras';

    constructor(
        private http: HttpClient,
    ) {}

    listar(idBalada: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/listar/${idBalada}`);
    }

    pesquisar(pesquisa: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/nome/${pesquisa}`);
    }

    criar(compra: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, compra);
    }

    editar(compra: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${compra.id}`, compra);
    }

    deletar(id: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}
