import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvidadoRoutingModule } from './convidado-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConvidadoRoutingModule
  ]
})
export class ConvidadoModule { }
