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

  dataSource = new MatTableDataSource<any>([]);
  mostrarOverlay = signal(false);
  mensagemOverlay = signal('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private aniversarioService: AniversarioService,
    private router: Router
  ) {}

  ngOnInit() {
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

  
  fecharOverlay() {
      this.mostrarOverlay.set(false); 
  }
 }
