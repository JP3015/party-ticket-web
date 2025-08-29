import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraRoutingModule } from './compra-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CompraRoutingModule
  ]
})
export class CompraModule { }
