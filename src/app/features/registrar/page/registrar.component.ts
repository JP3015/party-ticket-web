import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
    protected readonly title = signal('party-ticket-web');

    constructor(private router: Router) {}

    voltar() {
      this.router.navigate(['/']);
    }
 }
