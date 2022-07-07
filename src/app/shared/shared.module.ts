import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MensajeErrorCamposSubmitDirective } from './directivas/error-campos/directiva/mensaje-error-campos-submit.directive';
import { MensajeErrorCamposContenedorDirective } from './directivas/error-campos/directiva/mensaje-error-campos-contenedor.directive';
import { ErrorCamposPlantillaComponent } from './directivas/error-campos/componente/error-campos-plantilla.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TrackByPipe } from './pipe/track-by.pipe';

@NgModule({
  declarations: [
    ErrorCamposPlantillaComponent,
    MensajeErrorCamposContenedorDirective,
    MensajeErrorCamposSubmitDirective,
    TrackByPipe
  ],
  imports: [ReactiveFormsModule, FormsModule],
  exports: [
    CommonModule,
    HttpClientModule,
    MensajeErrorCamposContenedorDirective,
    MensajeErrorCamposSubmitDirective,
    ReactiveFormsModule,
    FormsModule,
    TrackByPipe
  ]
})
export class SharedModule { }
