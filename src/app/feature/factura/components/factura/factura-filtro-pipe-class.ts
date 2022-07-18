import { Pipe } from "@angular/core";
import { Factura } from "@factura/shared/model/factura";
import { FiltroTablaPipe } from "@shared/pipe";

@Pipe({
    name: 'filtroTablaFactura'
})
export class FiltroTablaClass extends FiltroTablaPipe{

    override transform(registros: Factura[], paginaActual: number, maxItemsPagina: number, buscar: string = ''): Factura[] {

        let registrosActuales = registros?.slice((paginaActual - 1) * maxItemsPagina, paginaActual * maxItemsPagina);
        
        if(buscar.length === 0){
            return registrosActuales;
        }

        const registrosFiltrados = registros.filter(rsp => 
            rsp.placa.toLowerCase().includes(buscar.toLowerCase()) || 
            rsp.estadoFactura.toLowerCase().includes(buscar.toLowerCase())
        );
        return registrosFiltrados;
    }
}