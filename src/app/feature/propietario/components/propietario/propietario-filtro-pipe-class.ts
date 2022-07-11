import { Pipe } from "@angular/core";
import { Propietario } from "@propietario/shared/model/propietario";
import { FiltroTablaPipe } from "@shared/pipe";

@Pipe({
    name: 'filtroTablaPropietario'
})
export class FiltroTablaClass extends FiltroTablaPipe{

    override transform(registros: Propietario[], paginaActual: number, maxItemsPagina: number, buscar: string = ''): Propietario[] {

        let registrosActuales = registros?.slice((paginaActual - 1) * maxItemsPagina, paginaActual * maxItemsPagina);
        
        if(buscar.length === 0){
            return registrosActuales;
        }

        const registrosFiltrados = registros.filter(rsp => 
            rsp.documento.includes(buscar) || rsp.nombreCompleto.toLowerCase().includes(buscar.toLowerCase())
        );
        return registrosFiltrados;
    }
}