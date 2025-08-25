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
    
    user = signal<{ username: string; email: string; role: string;} | null>(null);

    mostrarOverlay = signal(false);
    mensagemOverlay = signal('');
    mudarSenha = false;
    novaSenha: string | null = null;
    confirmarNovaSenha: string | null = null;

    constructor(
      private usuarioService: UsuarioService
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

    usuario(){
       if (!this.novaSenha || !this.confirmarNovaSenha) {
        this.mensagemOverlay.set('Preencha todos os campos!');
        this.mostrarOverlay.set(true);
        return;
      }
      if(this.novaSenha !== this.confirmarNovaSenha){
        this.mensagemOverlay.set('Senhas diferentes!');
        this.mostrarOverlay.set(true);
        return;
      }
      this.usuarioService.AlterarSenhaUsuario(this.novaSenha).subscribe({
          next: () => {
            this.voltar();
            this.mensagemOverlay.set('Senha alterada com sucesso!');
            this.mostrarOverlay.set(true);
          },
          error: () => {
            this.mensagemOverlay.set('Erro ao alterar senha.');
            this.mostrarOverlay.set(true);
          }
      });
    }

    fecharOverlay() {
      this.mostrarOverlay.set(false); 
    }

    voltar() {
      this.mudarSenha = false;
      this.novaSenha = null;
      this.confirmarNovaSenha = null;
    }
 }
