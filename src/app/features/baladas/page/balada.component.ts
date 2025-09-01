import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { OverlayComponent } from '../../../shared/components/overlay/overlay.component';
import { MatIconModule } from '@angular/material/icon';
import { BaladaService } from '../../../core/services/balada.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balada',
  templateUrl: './balada.component.html',
  imports: [FormsModule, SidebarComponent, MatPaginator, MatTableModule, OverlayComponent, MatIconModule],
  styleUrls: ['./balada.component.css']
})

export class BaladaComponent implements OnInit  {
  displayedColumns: string[] = [
    'nomeEvento',
    'local',
    'data',
    'capacidade',
    'ingressosDisponiveis',
    'acoes'
  ];

  balada = {
      nomeEvento: '',
      data: '',
      local: '',
      capacidade: '',
      ingressosDisponiveis: '',
      valorInvestido: '',
      receitaEstimada: ''
  };

  dataSource = new MatTableDataSource<any>([]);
  mostrarOverlay = signal(false);
  mensagemOverlay = signal('');
  criarBalada = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private baladaService: BaladaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.baladaService.listar().subscribe({
      next: (dados) => {
        this.dataSource.data = dados;
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.mensagemOverlay.set('Erro ao listar as baladas.');
        this.mostrarOverlay.set(true);
      }
    });
  }

  criar() {
      this.baladaService.criar(this.balada).subscribe({
        next: (response) => {
          this.mensagemOverlay.set(response.mensagem);
          this.mostrarOverlay.set(true);
        },
        error: (response) => {
          this.mensagemOverlay.set(response.error.erro || 'Erro ao criar balada.');
          this.mostrarOverlay.set(true);
        }
      });
  }
  
  deletar(id: number): void {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
      this.baladaService.deletar(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter((balada: any) => balada.id !== id);
        },
        error: () => {
          console.error('Erro ao deletar registro!');
        }
      });
    }
  }

  verCompras(idBalada: number): void {
    this.router.navigate(['/compras', idBalada]);
  }
  voltar(){
    this.criarBalada = false;
    this.balada = {
      nomeEvento: '',
      data: '',
      local: '',
      capacidade: '',
      ingressosDisponiveis: '',
      valorInvestido: '',
      receitaEstimada: ''
    };
    this.ngOnInit()
  }
  
  fecharOverlay() {
      this.mostrarOverlay.set(false);
      this.voltar();
  }
 }
