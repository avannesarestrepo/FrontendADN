import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Observable, of } from "rxjs";
import { HttpService } from "@core/services/http.service";
import { catchError, map } from "rxjs/operators";
import { respuestaHttpApi } from "./IHttpResponseApi";

@Injectable({
  providedIn: 'root'
})
export class HttpApiErrorClass {

  response = { error: false, msg: '', data: null };
  env: string = `${environment.endpoint}`;

  constructor(protected http: HttpService) { }

  error(error: HttpErrorResponse) {
    let mensajeError = '';
    if (error.error instanceof ErrorEvent) {
      mensajeError = error.error.message;
    } else {
      mensajeError = `Codigo de Error: ${error.status} \n mensaje: ${error.error.mensaje}`;
    }
    return of({ error: true, msg: mensajeError, data: error.error });
  }

  mapearRespuesta(rsp: Observable<respuestaHttpApi<any>>): Observable<respuestaHttpApi<any>> {
    return rsp.pipe(
      map(r => {
        this.response.data = r;
        return this.response;
      }), catchError(this.error)
    );
  }

}