import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notFound',
  templateUrl: './not-found.component.html',
  imports: [FormsModule],
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
    protected readonly title = signal('party-ticket-web');
    
 }
