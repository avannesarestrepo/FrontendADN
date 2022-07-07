import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPropietarioComponent } from './components/crear-propietario/crear-propietario.component';
import { PropietarioComponent } from './components/propietario/propietario.component';

const routes: Routes = [
  {
      path: '',
      component: PropietarioComponent,
      children: [
        {
          path: 'crear',
          component: CrearPropietarioComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropietarioRoutingModule { }
