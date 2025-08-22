import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";
import { UsuarioService } from '../../../core/services/usuario.service';
import { OverlayComponent } from '../../../shared/components/overlay/overlay.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  imports: [FormsModule, SidebarComponent, OverlayComponent],
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
    
    user = signal<{ username: string; email: string; role: string } | null>(null);

    mostrarOverlay = signal(false);
    mensagemOverlay = signal('');

    constructor(
      private router: Router,
      private usuarioService: UsuarioService,
      private authService: AuthService
    ) {}

    ngOnInit() {
      this.usuarioService.BuscarUsuario().subscribe({
        next: (data) => {
          this.user.set({
            username: data.nomeUsuario,
            email: data.email,
            role: data.role
          });
        },
        error: () => {
          this.mensagemOverlay.set('Erro ao buscar usuário.');
          this.mostrarOverlay.set(true);
          this.user.set(null);
        }
      });
    }

    fecharOverlay() {
      this.mostrarOverlay.set(false); 
    }

    logout() {
      this.authService.removeToken();
      this.router.navigate(['/login']);
    }
 }
