import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    protected readonly title = signal('party-ticket-web');
    
    constructor(private router: Router) {}

    registrar() {
      this.router.navigate(['/registrar']);
    }
 }
