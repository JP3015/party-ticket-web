import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AniversarioService {
    private apiUrl = 'http://localhost:8080/aniversarios';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    listar(): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.get<any>(this.apiUrl, { headers });
    }

    criar(aniversario: any): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.post<any>(this.apiUrl, aniversario, { headers });
    }

    deletar(id: any): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
    }

}
