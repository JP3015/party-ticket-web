import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AniversarioRoutingModule } from './aniversario-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AniversarioRoutingModule
  ]
})
export class AniversarioModule { }
