import { Injectable } from "@angular/core";
import { HttpApiErrorClass } from "@core/HttpApiError.class";
import { Observable } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { Propietario } from '../model/propietario';

@Injectable()
export class PropietarioService extends HttpApiErrorClass{

    public consultar(){
        return this.http.doGet<Propietario[]>(`${environment.endpoint}/propietario`);
    }

    public obtenerPorId(id: number): Observable<{
        error: boolean,
        msg: string,
        data: Propietario
    }> {
        const response = { error: false, msg: '', data: null };
        return this.http.doGet<Propietario>
        (`${environment.endpoint}/propietario?id=${id}`)
        .pipe(
            map(r => {
                response.data = r;
                return response;
            }), catchError(this.error)
        );
    }

    public guardar(propietario: Propietario): Observable<{
        error: boolean,
        msg: string,
        data: any
    }> {
        const response = { error: false, msg: '', data: null };

        return this.http.doPost<Propietario, { error: boolean, msg: string, data: any }>
        (`${environment.endpoint}/propietario`, propietario)
        .pipe(
            map(r => {
                response.data = r;
                return response;
            }), catchError(this.error)  
        );
    }

    public modificar(propietario: Propietario): Observable<{
        error: boolean,
        msg: string,
        data: any
    }> {
        const response = { error: false, msg: '', data: null };
        return this.http.doPut<Propietario, { error: boolean, msg: string, data: any }>
        (`${environment.endpoint}/propietario/${propietario.id}`, propietario)
        .pipe(
            map(r => {
                response.data = r;
                return response;
            }), catchError(this.error)
        );
    }

    public eliminar(documento: number): Observable<{
        error: boolean,
        msg: string,
        data: any
    }> {
        const response = { error: false, msg: '', data: null };

        return this.http.doDelete<{ error: boolean, msg: string, data: any }>
        (`${environment.endpoint}/propietario?documento=${documento}`)
        .pipe(
            map(r => {
                response.data = r;
                return response;
            }), catchError(this.error)
        );
    }
}