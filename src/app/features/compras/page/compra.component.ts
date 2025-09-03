import { ChangeDetectorRef, Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { OverlayComponent } from '../../../shared/components/overlay/overlay.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { CompraService } from '../../../core/services/compra.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  imports: [FormsModule, SidebarComponent, MatPaginator, MatTableModule, OverlayComponent, MatIconModule, NgxMaskDirective, NgxMaskPipe],
  providers: [
    provideNgxMask()
  ],
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit  {
  displayedColumns: string[] = [
    'nome',
    'email',
    'quantidadeIngressos',
    'dataCompra',
    'acoes'
  ];

  dataSource = new MatTableDataSource<any>([]);
  mostrarOverlay = signal(false);
  mensagemOverlay = signal('');
  criarCompra = false;
  editando = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private compraService: CompraService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  compra = {
      id: null,
      nome: '',
      email: '',
      cpf: '',
      rg: '',
      quantidadeIngressos: '',
      dataCompra: new Date().toISOString().split('T')[0],
      balada: {
        id: 0
      }
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.compra.balada.id = +id;
      this.compraService.listar(+id).subscribe({
        next: (response) => {
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.cdr.detectChanges();
        },
        error: () => {
          this.mensagemOverlay.set('Erro ao listar compras!');
          this.mostrarOverlay.set(true);
        }
      });
    }
  }


 editar(element: any) {
    this.compra = { ...element }; 
    this.criarCompra = true;
    this.editando = true;
  }

  salvar() {
    if (this.editando) {
        this.compraService.editar(this.compra).subscribe({
        next: (response) => {
          this.mensagemOverlay.set(response.mensagem);
          this.mostrarOverlay.set(true);
          this.voltar();
        },
        error: () => {
          this.mensagemOverlay.set('Erro ao atualizar balada.');
          this.mostrarOverlay.set(true);
        }
      });
    } else {
      this.compraService.criar(this.compra).subscribe({
        next: (response) => {
          this.mensagemOverlay.set(response.mensagem);
          this.mostrarOverlay.set(true);
        },
        error: (response) => {
          this.mensagemOverlay.set(response.error.erro || 'Erro ao cadastrar compra.');
          this.mostrarOverlay.set(true);
        }
      });
    }
  }

  deletar(id: number): void {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
      this.compraService.deletar(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter((convidado: any) => convidado.id !== id);
        },
        error: () => {
          this.mensagemOverlay.set('Erro deletar registro.');
          this.mostrarOverlay.set(true);
        }
      });
    }
  }

  voltarBalada() {
    this.router.navigate(['/baladas']);
  }
  
  voltar(){
    this.criarCompra = false;
    this.editando = false;
    this.compra = {
      id: null,
      nome: '',
      email: '',
      cpf: '',
      rg: '',
      quantidadeIngressos: '',
      dataCompra: new Date().toISOString().split('T')[0],
      balada: {
        id: 0
      }
    };
    this.ngOnInit()
  }

  fecharOverlay() {
      this.mostrarOverlay.set(false); 
      this.voltar();
  }
 }
