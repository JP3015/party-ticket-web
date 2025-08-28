import { ChangeDetectorRef, Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { OverlayComponent } from '../../../shared/components/overlay/overlay.component';
import { ConvidadoService } from '../../../core/services/convidado.service';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-convidado',
  templateUrl: './convidado.component.html',
  imports: [FormsModule, SidebarComponent, MatPaginator, MatTableModule, OverlayComponent, MatIconModule],
  styleUrls: ['./convidado.component.css']
})
export class ConvidadoComponent implements OnInit  {
  displayedColumns: string[] = [
    'nome',
    'email',
    'acoes'
  ];

  dataSource = new MatTableDataSource<any>([]);
  mostrarOverlay = signal(false);
  mensagemOverlay = signal('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private convidadoService: ConvidadoService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.convidadoService.listar(+id).subscribe({
        next: (response) => {
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.cdr.detectChanges();
        },
        error: () => {
          this.mensagemOverlay.set('Erro listar convidados!');
          this.mostrarOverlay.set(true);
        }
      });
    }
  }


  deletar(id: number): void {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
      this.convidadoService.deletar(id).subscribe({
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

  
  fecharOverlay() {
      this.mostrarOverlay.set(false); 
  }
 }
