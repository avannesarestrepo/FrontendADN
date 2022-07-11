import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Propietario } from '@propietario/shared/model/propietario';
import { PropietarioService } from '@propietario/shared/service/propietario.service';

const CREADO = 'El propietario fue creado exitosamente';
const MODIFICADO = 'El propietario fue modificado exitosamente';
const REDIRECCION_A_LISTADO = "/propietario";

@Component({
  selector: 'app-crear-propietario',
  templateUrl: './crear-propietario.component.html',
  styleUrls: ['./crear-propietario.component.css']
})
export class CrearPropietarioComponent implements OnInit {
  propietarioForm: FormGroup;
  propietario: Propietario;

  esCrear: boolean = true;
  id: number;

  constructor(protected propietarioService: PropietarioService, private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.construirFormulario();
    if(this.id != null){
      this.esCrear = false;
      this.obtenerPropietarioPorId(this.id);
    }
  }

  obtenerPropietarioPorId(id: number): void {
    this.propietarioService.obtenerPorId(id).subscribe(r => {
      if(r.error){
        alert(r.msg);
      }else{
        this.llenarPropietarioForm(r.data);
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
    if(this.propietarioForm.valid){
      this.propietarioService.guardar(this.propietarioForm.value).subscribe(r => {
        this.respuesta(r, CREADO, REDIRECCION_A_LISTADO);
      })
    }
  }

  modificar(){
    this.propietarioForm.value.id = this.id;
    this.propietarioService.modificar(this.propietarioForm.value).subscribe(r => {
      this.respuesta(r, MODIFICADO, REDIRECCION_A_LISTADO);
    })
  }

  private construirFormulario(){
    this.propietarioForm =  new FormGroup({
      tipoDocumento: new FormControl('', [Validators.required]),
      documento: new FormControl('', [Validators.required]),
      nombreCompleto: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required])
    });
  }

  llenarPropietarioForm(propietario: Propietario){
    this.propietarioForm.controls['tipoDocumento'].setValue(propietario.tipoDocumento);
    this.propietarioForm.controls['documento'].setValue(propietario.documento);
    this.propietarioForm.controls['nombreCompleto'].setValue(propietario.nombreCompleto);
    this.propietarioForm.controls['email'].setValue(propietario.email);
    this.propietarioForm.controls['telefono'].setValue(propietario.telefono);
  }

  private respuesta(r: { error: boolean, msg: string, data: any }, respuestaExitosamente: string, redireccion: string ){
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
}
