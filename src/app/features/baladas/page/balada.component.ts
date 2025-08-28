import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { OverlayComponent } from '../../../shared/components/overlay/overlay.component';
import { MatIconModule } from '@angular/material/icon';
import { BaladaService } from '../../../core/services/balada.service';

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

  dataSource = new MatTableDataSource<any>([]);
  mostrarOverlay = signal(false);
  mensagemOverlay = signal('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private baladaService: BaladaService) {}

  ngOnInit() {
    this.baladaService.listar().subscribe({
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

  fecharOverlay() {
      this.mostrarOverlay.set(false); 
  }
 }
