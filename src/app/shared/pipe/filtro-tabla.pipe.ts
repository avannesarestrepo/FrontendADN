import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filtroTabla'
})
export class FiltroTablaPipe implements PipeTransform{

    transform(_registros: any[], _pagina: number, _maxItemsPagina: number, _buscar: string = ''): any[] {
        return[];
    }
    
}