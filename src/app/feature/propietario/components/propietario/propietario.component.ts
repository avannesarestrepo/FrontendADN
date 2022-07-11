import { Component, OnInit } from '@angular/core';
import { Propietario } from '@propietario/shared/model/propietario';

import { PropietarioService } from '@propietario/shared/service/propietario.service';

@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css']  
})
export class PropietarioComponent implements OnInit {
  public listaPropietario: Propietario[];

  public pagActual: number = 0;
  public totalPropietarios: number = 0;
  public maxPorPag: number = 5;

  public buscar: string = '';

  constructor(protected propietarioService: PropietarioService) { }

  ngOnInit() {
    this.llenarListaPropietarios();
  }

  private llenarListaPropietarios(){
    this.propietarioService.consultar().subscribe(result => {
      this.listaPropietario = result;
      this.totalPropietarios = result.length;
    });
  }

  eliminarPropietario(documento: number): void {
    if(confirm("Desea eliminar el propietario")){
      this.propietarioService.eliminar(documento).subscribe(r => {
        if(r.error){
          alert(r.data.mensaje);
        } else {
          alert('Eliminado exitosamente')
          this.llenarListaPropietarios();
        }
      });
    }    
  }
}
