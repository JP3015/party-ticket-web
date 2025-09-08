import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaladaComponent } from './page/balada.component';

const routes: Routes = [
  {
    path: '',
    component: BaladaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaladaRoutingModule { }
