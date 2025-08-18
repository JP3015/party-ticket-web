import { NgModule, Optional, SkipSelf } from '@angular/core';
import { UsuarioService } from './services/usuario.service';

@NgModule({
  providers: [
    UsuarioService,
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule já foi carregado. Importar apenas no AppModule.');
    }
  }
}
