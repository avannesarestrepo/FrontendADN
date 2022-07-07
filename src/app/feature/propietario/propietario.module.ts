import { NgModule } from '@angular/core';

import { PropietarioRoutingModule } from './propietario-routing.module';
import { PropietarioComponent } from './components/propietario/propietario.component';
import { CrearPropietarioComponent } from './components/crear-propietario/crear-propietario.component';
import { SharedModule } from '@shared/shared.module';
import { PropietarioService } from './shared/service/propietario.service';

@NgModule({
  declarations: [
    PropietarioComponent,
    CrearPropietarioComponent
  ],
  imports: [
    SharedModule,
    PropietarioRoutingModule
  ],
  providers: [PropietarioService]
})
export class PropietarioModule { }
