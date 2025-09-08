import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { OverlayComponent } from './components/overlay/overlay.component';

@NgModule({
  imports: [CommonModule, SidebarComponent, OverlayComponent],
  exports: [SidebarComponent, OverlayComponent] 
})
export class SharedModule {}
