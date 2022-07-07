import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { FacturaRoutingModule } from './factura-routing.module';
import { FacturaComponent } from './components/factura/factura.component';
import { FacturaService } from './shared/service/factura.service';
import { CrearFacturaComponent } from './components/crear-factura/crear-factura.component';

@NgModule({
  declarations: [
    FacturaComponent,
    CrearFacturaComponent
  ],
  imports: [
    SharedModule,
    FacturaRoutingModule
  ],
  providers: [FacturaService]
})
export class FacturaModule { }
