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

  constructor(protected propietarioService: PropietarioService) { }

  ngOnInit() {
    this.llenarListaPropietarios();
  }

  private llenarListaPropietarios(){
    this.propietarioService.consultar().subscribe(result => {
      this.listaPropietario = result;
    });
  }

  
}
