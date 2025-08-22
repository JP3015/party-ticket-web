import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    private apiUrl = 'http://localhost:8080';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    RegistrarUsuario(usuario: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/auth/registrar`, usuario);
    }

    LoginUsuario(usuario: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/auth/login`, usuario);
    }

    BuscarUsuario(): Observable<any> {
        const token = this.authService.getToken();
        if (!token) throw new Error('Usuário não está autenticado!');
        return this.http.get<any>(`${this.apiUrl}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

}
