import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../core/services/usuario.service';
import { OverlayComponent } from '../../../shared/components/overlay/overlay.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, OverlayComponent],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    protected readonly title = signal('party-ticket-web');

    mostrarOverlay = signal(false);
    mensagemOverlay = signal('');
    
    constructor(
      private router: Router,
      private usuarioService: UsuarioService
    ) {}

    usuario = {
      nomeUsuario: '',
      senha: ''
    };

    login() {
        this.usuarioService.LoginUsuario(this.usuario).subscribe({
        next: (response) => {
          this.mensagemOverlay.set(response.mensagem);
          this.mostrarOverlay.set(true);
        },
        error: (response) => {
          this.mensagemOverlay.set(response.error.erro || 'Erro ao logar.');
          this.mostrarOverlay.set(true);
        }
      });
    }

    registrar() {
      this.router.navigate(['/registrar']);
    }
 }
