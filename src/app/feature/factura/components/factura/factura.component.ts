import { Component, OnInit } from '@angular/core';
import { Factura } from '@factura/shared/model/factura';

import { FacturaService } from '@factura/shared/service/factura.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  public listaFacturas: Factura[];

  esModalidadHora: string;

  public pagActual: number = 0;
  public totalFacturas: number = 0;
  public maxPorPag: number = 5;

  public buscar: string = '';

  constructor(protected facturaService: FacturaService) { }

  ngOnInit(): void {
    this.llenarListaFactura();
  }

  private llenarListaFactura(){
    this.facturaService.consultar().subscribe(result => {
      this.listaFacturas = result;
      this.totalFacturas = result.length;
    });
  }

  anular(factura: Factura): void {
    this.facturaService.anular(factura).subscribe(r => {
      if(r.error){
        alert(r.data.mensaje);
      }else{
        alert("Factura anulada exitosamente")
        this.llenarListaFactura();
      }
    })
  }
}
