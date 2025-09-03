import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaladaService {
    private apiUrl = 'http://localhost:8080/baladas';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    listar(): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.get<any>(this.apiUrl, { headers });
    }

    criar(balada: any): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.post<any>(this.apiUrl, balada, { headers });
    }

    editar(balada: any): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.put<any>(`${this.apiUrl}/${balada.id}`, balada, { headers });
    }

    deletar(id: any): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
    }
}
