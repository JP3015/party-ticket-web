import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/authGuard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'registrar',
    loadChildren: () =>
      import('./features/registrar/registrar.module').then((m) => m.RegistrarModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'aniversarios',
    loadChildren: () =>
      import('./features/aniversarios/aniversario.module').then((m) => m.AniversarioModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'convidados/:id',
    loadChildren: () =>
      import('./features/convidados/convidado.module').then((m) => m.ConvidadoModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'baladas',
    loadChildren: () =>
      import('./features/baladas/balada.module').then((m) => m.BaladaModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./features/perfil/perfil.module').then((m) => m.PerfilModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/not-found/not-found.module').then((m) => m.NotFoundModule),
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
