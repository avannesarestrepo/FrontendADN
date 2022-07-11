import { NgModule } from '@angular/core';

import { PropietarioRoutingModule } from './propietario-routing.module';
import { FiltroTablaClass } from './components/propietario/propietario-filtro-pipe-class';
import { PropietarioComponent } from './components/propietario/propietario.component';
import { CrearPropietarioComponent } from './components/crear-propietario/crear-propietario.component';
import { SharedModule } from '@shared/shared.module';
import { PropietarioService } from './shared/service/propietario.service';

@NgModule({
  declarations: [
    PropietarioComponent,
    CrearPropietarioComponent,
    FiltroTablaClass
  ],
  imports: [
    SharedModule,
    PropietarioRoutingModule
  ],
  providers: [PropietarioService]
})
export class PropietarioModule { }
