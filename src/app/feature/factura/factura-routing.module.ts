import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearFacturaComponent } from './components/crear-factura/crear-factura.component';
import { FacturaComponent } from './components/factura/factura.component';

const routes: Routes = [
  {
    path:'',
    component: FacturaComponent,
    children: [
      {
        path: 'crear',
        component: CrearFacturaComponent
      },{
        path: 'editar/:id',
        component: CrearFacturaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
