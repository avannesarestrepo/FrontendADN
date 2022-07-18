import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { FacturaRoutingModule } from './factura-routing.module';
import { FacturaComponent } from './components/factura/factura.component';
import { FacturaService } from './shared/service/factura.service';
import { CrearFacturaComponent } from './components/crear-factura/crear-factura.component';
import { FiltroTablaClass } from '@factura/components/factura/factura-filtro-pipe-class';

@NgModule({
  declarations: [
    FacturaComponent,
    CrearFacturaComponent,
    FiltroTablaClass
  ],
  imports: [
    SharedModule,
    FacturaRoutingModule
  ],
  providers: [FacturaService]
})
export class FacturaModule { }
