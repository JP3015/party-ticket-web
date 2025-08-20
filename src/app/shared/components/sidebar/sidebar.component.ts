import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}