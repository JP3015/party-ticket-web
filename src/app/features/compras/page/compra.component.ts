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

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  imports: [FormsModule, SidebarComponent, MatPaginator, MatTableModule, OverlayComponent, MatIconModule],
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private compraService: CompraService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
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

  voltar() {
    this.router.navigate(['/baladas']);
  }
  
  fecharOverlay() {
      this.mostrarOverlay.set(false); 
  }
 }
