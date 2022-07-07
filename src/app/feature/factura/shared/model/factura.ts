import { Vehiculo } from "./vehiculo";

export interface Factura{
    id: number;
    tipoModalidad: string;
    vehiculo: Vehiculo;
    placa: string;
    estadoFactura: string;
}