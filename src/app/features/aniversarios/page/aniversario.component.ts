import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AniversarioService } from '../../../core/services/aniversario.service';
import { OverlayComponent } from '../../../shared/components/overlay/overlay.component';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-aniversario',
  templateUrl: './aniversario.component.html',
  imports: [FormsModule, SidebarComponent, MatPaginator, MatTableModule, OverlayComponent, MatIconModule],
  styleUrls: ['./aniversario.component.css']
})
export class AniversarioComponent implements OnInit  {
  displayedColumns: string[] = [
    'nomeEvento',
    'local',
    'data',
    'capacidade',
    'capacidadeRestante',
    'nomeAniversariante',
    'idadeAniversariante',
    'acoes'
  ];

  aniversario = {
      id: null,
      nomeEvento: '',
      data: '',
      local: '',
      capacidade: '',
      nomeAniversariante: '',
      idadeAniversariante: ''
  };

  dataSource = new MatTableDataSource<any>([]);
  mostrarOverlay = signal(false);
  mensagemOverlay = signal('');
  criarAniversario = false;
  editando = false;
  pesquisa = '';
  roleUsuario = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private aniversarioService: AniversarioService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuarioService.BuscarUsuario().subscribe({
        next: (data) => {
          this.roleUsuario = data.role;
        },
        error: () => {
          this.mensagemOverlay.set('Erro ao buscar usuário.');
          this.mostrarOverlay.set(true);
        }
    });
    this.aniversarioService.listar().subscribe({
      next: (dados) => {
        this.dataSource.data = dados;
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.mensagemOverlay.set('Erro ao listar os aniversários.');
        this.mostrarOverlay.set(true);
      }
    });
  }

  verConvidados(idAniversario: number): void {
    this.router.navigate(['/convidados', idAniversario]);
  }

  editar(element: any) {
    this.aniversario = { ...element }; 
    this.criarAniversario = true;
    this.editando = true;
  }

  validarRole(): boolean{
    return this.roleUsuario == 'Administrador' ? true : false;
  }

  pesquisar(pesquisa: string) {
    if(pesquisa == '' || pesquisa == null){
      this.ngOnInit();
    }
    else{
      this.aniversarioService.pesquisar(pesquisa).subscribe({
        next: (dados) => {
          this.dataSource.data = dados;
          this.dataSource.paginator = this.paginator;
        },
        error: () => {
          this.mensagemOverlay.set('Erro ao pesquisar.');
          this.mostrarOverlay.set(true);
        }
      });
    }
  }

  salvar() {
    if (this.editando) {
        this.aniversarioService.editar(this.aniversario).subscribe({
        next: (response) => {
          this.mensagemOverlay.set(response.mensagem);
          this.mostrarOverlay.set(true);
          this.voltar();
        },
        error: () => {
          this.mensagemOverlay.set('Erro ao atualizar aniversário.');
          this.mostrarOverlay.set(true);
        }
      });
    } else {
      this.aniversarioService.criar(this.aniversario).subscribe({
        next: (response) => {
          this.mensagemOverlay.set(response.mensagem);
          this.mostrarOverlay.set(true);
        },
        error: (response) => {
          this.mensagemOverlay.set(response.error.erro || 'Erro ao criar aniversário.');
          this.mostrarOverlay.set(true);
        }
      });
    }
  }

  deletar(id: number): void {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
      this.aniversarioService.deletar(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter((aniversario: any) => aniversario.id !== id);
        },
        error: () => {
          this.mensagemOverlay.set('Erro deletar registro.');
          this.mostrarOverlay.set(true);
        }
      });
    }
  }

  voltar(){
    this.criarAniversario = false;
    this.editando = false;
    this.aniversario = {
      id: null,
      nomeEvento: '',
      data: '',
      local: '',
      capacidade: '',
      nomeAniversariante: '',
      idadeAniversariante: ''
    };
    this.ngOnInit()
  }
  
  fecharOverlay() {
      this.mostrarOverlay.set(false);
      this.voltar();
  }
 }
