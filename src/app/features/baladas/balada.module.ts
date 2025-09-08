import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaladaRoutingModule } from './balada-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BaladaRoutingModule
  ]
})
export class BaladaModule { }
