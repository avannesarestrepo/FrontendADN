import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Propietario } from '@propietario/shared/model/propietario';
import { PropietarioService } from '@propietario/shared/service/propietario.service';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs';

import { CrearPropietarioComponent } from './crear-propietario.component';

describe('CrearPropietarioComponent', () => {
  const CREADO = 'El propietario fue creado exitosamente';

  let fixture: ComponentFixture<CrearPropietarioComponent>;
  let component: CrearPropietarioComponent;
  let propietarioService: PropietarioService;
  let propietarioTest: Propietario;
  let mockRespuesta: { error: boolean, msg: string, data: any };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPropietarioComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule
      ],
      providers:[
        HttpService,
        PropietarioService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                  id: null
              },
            },
          },
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPropietarioComponent);
    component = fixture.componentInstance;
    propietarioService = TestBed.inject(PropietarioService);
    propietarioTest = new Propietario(4,'CC','1020491510','Angie V Restrepo','ava@gmail.com',1234456);
    mockRespuesta = {error: false, msg: "", data: propietarioTest};
    spyOn(propietarioService, 'obtenerPorId').and.returnValue(of(mockRespuesta));
    fixture.detectChanges();
  });
  
  it('deberia crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('el formulario deberia ser invalido', () => {
    expect(component.propietarioForm.valid).toBeFalsy();
  });

  it('el formulario deberia ser valido', () => {
    component.propietarioForm.controls['tipoDocumento'].setValue(propietarioTest.tipoDocumento);
    component.propietarioForm.controls['documento'].setValue(propietarioTest.documento);
    component.propietarioForm.controls['nombreCompleto'].setValue(propietarioTest.nombreCompleto);
    component.propietarioForm.controls['email'].setValue(propietarioTest.email);
    component.propietarioForm.controls['telefono'].setValue(propietarioTest.telefono);

    expect(component.propietarioForm.valid).toBeTrue();
  });

  it('deberia guardar el propietario', () => {
    mockRespuesta = { error: false, msg: '', data: null };
    spyOn(propietarioService, 'guardar').and.returnValue(of(mockRespuesta));
    spyOn(window, 'alert');
    component.propietarioForm.controls['tipoDocumento'].setValue(propietarioTest.tipoDocumento);
    component.propietarioForm.controls['documento'].setValue(propietarioTest.documento);
    component.propietarioForm.controls['nombreCompleto'].setValue(propietarioTest.nombreCompleto);
    component.propietarioForm.controls['email'].setValue(propietarioTest.email);
    component.propietarioForm.controls['telefono'].setValue(propietarioTest.telefono);

    component.guardar();
    expect(component.esCrear).toBeTrue();
    expect(window.alert).toHaveBeenCalledWith(CREADO);
  });

  it('deberia actualizar el propietario', () => {
    component.propietarioForm.controls['tipoDocumento'].setValue(propietarioTest.tipoDocumento);
    component.propietarioForm.controls['documento'].setValue(propietarioTest.documento);
    component.propietarioForm.controls['nombreCompleto'].setValue('prueba');
    component.propietarioForm.controls['email'].setValue(propietarioTest.email);
    component.propietarioForm.controls['telefono'].setValue(propietarioTest.telefono);

    component.esCrear = false;
    component.ejecutarAccion();
    expect(component.esCrear).toBeFalse();
  });

});
