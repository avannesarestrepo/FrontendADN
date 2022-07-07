import { Vehiculo } from "./vehiculo";

export class Factura{
    id: number;
    tipoModalidad: string;
    vehiculo: Vehiculo;
    placa: string;
    estadoFactura: string;

    constructor(id: number, tipoModalidad: string, vehiculo: Vehiculo, placa: string, estadoFactura: string){
        this.id = id;
        this.tipoModalidad = tipoModalidad;
        this.vehiculo = vehiculo;
        this.placa = placa;
        this.estadoFactura = estadoFactura;
    }
}