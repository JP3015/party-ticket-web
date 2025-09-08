import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() closed = new EventEmitter<void>();

  fecharOverlay() {
    this.closed.emit();
  }
}
