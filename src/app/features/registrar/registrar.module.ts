import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarRoutingModule } from './registrar-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrarRoutingModule
  ]
})
export class RegistrarModule { }
