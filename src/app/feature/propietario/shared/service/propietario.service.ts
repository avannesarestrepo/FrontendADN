import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { environment } from "src/environments/environment";
import { Propietario } from '../model/propietario';

@Injectable()
export class PropietarioService{

    constructor(protected http: HttpService) { }

    public consultar(){
        return this.http.doGet<Propietario[]>(`${environment.endpoint}/propietario`);
    }
}