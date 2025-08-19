import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../core/services/usuario.service';
import { OverlayComponent } from '../../../shared/components/overlay/overlay.component';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  imports: [FormsModule, OverlayComponent],
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
    protected readonly title = signal('party-ticket-web');

    mostrarOverlay = signal(false);
    mensagemOverlay = signal('');

    constructor(
          private router: Router,
          private usuarioService: UsuarioService
    ) {}

    usuario = {
      nomeUsuario: '',
      email: '',
      senha: ''
    };

    registrar() {
      this.usuarioService.RegistrarUsuario(this.usuario).subscribe({
        next: (response) => {
          this.mensagemOverlay.set(response.mensagem);
          this.mostrarOverlay.set(true);
        },
        error: (response) => {
          this.mensagemOverlay.set(response.error.erro || 'Erro ao registrar usuário.');
          this.mostrarOverlay.set(true);
        }
      });
    }

    
    fecharOverlay() {
      this.mostrarOverlay.set(false);
    }

    voltar() {
      this.router.navigate(['/']);
    }
 }
