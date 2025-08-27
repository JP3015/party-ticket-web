import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { OverlayComponent } from '../../../shared/components/overlay/overlay.component';
import { BaladaService } from '../../../core/services/balada.service';

@Component({
  selector: 'app-balada',
  templateUrl: './balada.component.html',
  imports: [FormsModule, SidebarComponent, MatPaginator, MatTableModule, OverlayComponent],
  styleUrls: ['./balada.component.css']
})
export class BaladaComponent implements OnInit  {
  displayedColumns: string[] = [
    'nomeEvento',
    'local',
    'data',
    'capacidade',
    'ingressosDisponiveis'
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
  
  fecharOverlay() {
      this.mostrarOverlay.set(false); 
  }
 }
