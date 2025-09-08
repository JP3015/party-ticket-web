import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvidadoComponent } from './page/convidado.component';

const routes: Routes = [
  {
    path: '',
    component: ConvidadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvidadoRoutingModule { }
