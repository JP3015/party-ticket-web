import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent {
  @Input() mensagem = '';
  @Input() mostrar = false;

  constructor(private router: Router) {}

  fecharOverlay() {
    this.mostrar = false;
    this.router.navigate(['/login']);
  }
}
