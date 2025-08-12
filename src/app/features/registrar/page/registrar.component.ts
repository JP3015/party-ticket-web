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
        next: () => {
          this.mensagemOverlay.set('Usuário registrado com sucesso!');
          this.mostrarOverlay.set(true);
        },
        error: () => {
          this.mensagemOverlay.set('Erro ao registrar usuário.');
          this.mostrarOverlay.set(true);

        }
      });
    }

    voltar() {
      this.router.navigate(['/']);
    }
 }
