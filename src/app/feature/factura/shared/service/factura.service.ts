import { Injectable } from "@angular/core";
import { HttpApiErrorClass } from "@core/HttpApiError.class";
import { Observable } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Factura } from '../model/factura';
import { Vehiculo } from '../model/vehiculo';

@Injectable()
export class FacturaService extends HttpApiErrorClass{

    public consultar(){
        return this.http.doGet<Factura[]>(`${environment.endpoint}/factura`);
    }

    public obtenerPorId(id: number): Observable<{
        error: boolean, 
        msg: string,
        data: Factura
    }> {
        const response = { error: false, msg: '', data: null };
        return this.http.doGet<Factura>
            (`${environment.endpoint}/factura/${id}`)
                .pipe(
                    map(r => {
                        response.data = r;
                        return response;
                    }), catchError(this.error)
                );
    }

    public obtenerVehiculoPorPlaca(placa: string): Observable<{
        error: boolean,
        msg: string,
        data: Vehiculo
    }> {
        const response = { error: false, msg: '', data: null };
        return this.http.doGet<Vehiculo>
            (`${environment.endpoint}/vehiculo?placa=${placa}`)
            .pipe(
                map(r => {
                    response.data = r;
                    return response;
                }), catchError(this.error)
            );
    }

    public guardar(factura: Factura): Observable<{
        error: boolean,
        msg: string,
        data: any
    }> {
        const response = { error: false, msg: '', data: null };

        return this.http.doPost<Factura, { error: boolean, msg: string, data: any }>
        (`${environment.endpoint}/factura`, factura)
        .pipe(
          map(r => {
            response.data = r;
            return response;
          }), catchError(this.error)
        );
    }

    public anular(factura: Factura): Observable<{
        error: boolean,
        msg: string,
        data: any
    }> {
        const response = { error: false, msg: '', data:null }
        return this.http.doPut<Factura, {error: boolean, msg: string, data: any}> 
            (`${environment.endpoint}/factura?id=${factura.id}`, factura)
            .pipe(
                map(r => {
                    response.data = r;
                    return response;
                }), catchError(this.error)
            );
    }
}