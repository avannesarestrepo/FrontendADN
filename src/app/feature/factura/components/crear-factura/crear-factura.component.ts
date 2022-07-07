import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Factura } from '@factura/shared/model/factura';
import { FacturaService } from '@factura/shared/service/factura.service';

const CREADO =  'La factura fue creada exitosamente';
const REDIRECCION_A_LISTADO = '/factura/crear';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {
  facturaForm: FormGroup;
  Factura: Factura;

  modalidad: string;
  estado: string;
  esCrear: boolean = true;
  id: number;

  constructor(protected facturaService: FacturaService, private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.construirFormulario();
    if(this.id != null){
      this.esCrear = false;
      this.obtenerFacturaPorId(this.id);
    }
  }

  consultarVehiculo(): void {
    this.facturaService.obtenerVehiculoPorPlaca(this.facturaForm.value.placa).subscribe(r => {
      if(r.error){
        alert(r.msg);
      }else{
        this.facturaForm.value.vehiculo = r.data;
      }
    })
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

  guardar(){
    if(this.facturaForm.valid){
      this.facturaService.guardar(this.facturaForm.value).subscribe(r => {
          this.respuesta(r, CREADO, REDIRECCION_A_LISTADO);
      });
    }
  }

  private respuesta(r: {error: boolean, msg: string, data: any }, respuestaExitosamente: string, redireccion: string){
    if(r.error){
      alert(r.data.mensaje);
      return;
    } else {
      alert(respuestaExitosamente);
      this.router.navigateByUrl(redireccion);
    }
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
  }

}
