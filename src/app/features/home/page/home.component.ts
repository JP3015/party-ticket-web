import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [FormsModule, SidebarComponent],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    protected readonly title = signal('party-ticket-web');
    
    constructor(
      private router: Router,
      private authService: AuthService
    ) {}

    logout() {
      this.authService.removeToken();
      this.router.navigate(['/login']);
    }
 }
