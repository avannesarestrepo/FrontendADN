import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Factura } from '@factura/shared/model/factura';
import { Vehiculo } from '@factura/shared/model/vehiculo';
import { FacturaService } from '@factura/shared/service/factura.service';

const ACTUALIZADO = 'La factura fue actualizada exitosamente';
const CREADO =  'La factura fue creada exitosamente';
const REDIRECCION_A_LISTADO = '/factura';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {
  facturaForm: FormGroup;
  factura: Factura;
  vehiculo: Vehiculo;

  fechaInicio: string;
  modalidad: string;
  estado: string;
  esCrear: boolean = true;
  id: number;

  constructor(protected facturaService: FacturaService, private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id;
   }

  ngOnInit(): void {
    this.construirFormulario();
    if(this.id != null){
      this.esCrear = false;
      this.obtenerFacturaPorId(this.id);
    }
  }

  consultarVehiculo(): void {
    let placa = this.facturaForm.value.placa;
    this.facturaService.obtenerVehiculoPorPlaca(placa).subscribe(r => {
      if(r.error){
        alert(r.msg);
      }else{
        this.vehiculo = r.data;
      }
    });
  }
  
  obtenerFacturaPorId(id: number): void {
    this.facturaService.obtenerPorId(id).subscribe(r => {
        if(r.error){
          alert(r.msg);
        }else{
          this.llenarFacturaForm(r.data);
        }
    })
  }

  ejecutarAccion(){
    if(this.esCrear){
      this.guardar();
    }else{
      this.modificar();
    }
  }

  guardar(){
    if(this.facturaForm.valid){
      this.facturaForm.value.vehiculo = this.vehiculo;
      this.facturaService.guardar(this.facturaForm.value).subscribe(r => {
          this.respuesta(r, CREADO, REDIRECCION_A_LISTADO);
      });
    }
  }

  modificar(){
    this.facturaForm.value.vehiculo = this.vehiculo;
    this.facturaForm.value.id = this.id;
    this.facturaForm.value.fechaInicio = this.fechaInicio;
    this.facturaService.modificar(this.facturaForm.value).subscribe(r => {
      this.respuesta(r, ACTUALIZADO, REDIRECCION_A_LISTADO);
    });
  }

  private respuesta(r: {error: boolean, msg: string, data: any }, respuestaExitosamente: string, redireccion: string){
    if(r.error){
      alert(r.data.mensaje);
      return;
    } else {
      alert(respuestaExitosamente);
      this.redirectTo(redireccion);
    }
  }

  redirectTo(uri:string){
    this.router.navigateByUrl("/", {skipLocationChange: true}).then(() => this.router.navigate([uri]));
  }

  private construirFormulario(){
    this.facturaForm = new FormGroup({
      tipoModalidad: new FormControl('', [Validators.required]),
      placa: new FormControl('', [Validators.required]),
      estadoFactura: new FormControl('')
    });
  } 

  llenarFacturaForm(factura: Factura){
    this.facturaForm.controls['tipoModalidad'].setValue(factura.tipoModalidad);
    this.facturaForm.controls['placa'].setValue(factura.placa);
    this.facturaForm.controls['estadoFactura'].setValue(factura.estadoFactura);
    this.modalidad = factura.tipoModalidad;
    this.estado = factura.estadoFactura;
    this.fechaInicio = factura.fechaInicio;
  }

}
