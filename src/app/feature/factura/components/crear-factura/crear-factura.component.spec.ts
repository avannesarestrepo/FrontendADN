import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Factura } from '@factura/shared/model/factura';
import { Vehiculo } from '@factura/shared/model/vehiculo';
import { FacturaService } from '@factura/shared/service/factura.service';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs';
import { FiltroTablaClass } from '../factura/factura-filtro-pipe-class';
import { FacturaComponent } from '../factura/factura.component';
import { CrearFacturaComponent } from './crear-factura.component';

const CREADO =  'La factura fue creada exitosamente';
const ACTUALIZADO = 'La factura fue actualizada exitosamente';

describe('Prueba del componente: "CrearFacturaComponent"', () => {

  let fixture: ComponentFixture<CrearFacturaComponent>;
  let component: CrearFacturaComponent;
  let facturaService: FacturaService;
  let facturaTest: Factura;
  let mockRespuesta: { error: boolean, msg: string, data: any };

  let mockVehiculo: Vehiculo = new Vehiculo('XXX000');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearFacturaComponent, FiltroTablaClass],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{path:'factura', component: FacturaComponent}]),
        SharedModule
      ],
      providers: [
        HttpService,
        FacturaService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                  id: 1
              },
            },
          },
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearFacturaComponent);
    component = fixture.componentInstance;
    facturaService = TestBed.inject(FacturaService);
    facturaTest = new Factura(1, 'MENSUAL', new Vehiculo('XX0000'), '2022-07-06 20:17:42' , 'XXX000', 'CONFIRMADO');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('el formulario deberia ser invalido por falta de campo obligatorio', () => {
    component.ngOnInit;
    expect(component.facturaForm.valid).toBeFalsy();
  });

  it('el formulario deberia ser valido', () => {
    component.facturaForm.controls['tipoModalidad'].setValue(facturaTest.tipoModalidad);
    component.facturaForm.controls['placa'].setValue(facturaTest.placa);
    component.facturaForm.controls['estadoFactura'].setValue(facturaTest.estadoFactura);

    expect(component.facturaForm.valid).toBeTrue();
  });

  it('consultar vehiculo para guardar factura', () => {
    mockRespuesta = { error: false, msg: '', data: mockVehiculo };
    spyOn(facturaService, 'obtenerVehiculoPorPlaca').and.returnValue(of(mockRespuesta));

    component.consultarVehiculo();
    expect(component.vehiculo).toBe(mockRespuesta.data);
  });

  it('Deberia fallar la consulta de vehiculo para guardar factura', () => {
    mockRespuesta = { error: true, 
                      msg: 'El Vehiculo es obligatorio', 
                      data: { 
                        nombreExcepcion: 'ExcepcionSinDatos', 
                        mensaje: 'El Vehiculo es obligatorio'
                      }
                    };
    spyOn(facturaService, 'obtenerVehiculoPorPlaca').and.returnValue(of(mockRespuesta));

    spyOn(window, 'alert');
    component.consultarVehiculo();
    expect(window.alert).toHaveBeenCalledWith(mockRespuesta.data.mensaje);
  });

  it('deberia guardar la factura', () => {
    component.esCrear = true;
    mockRespuesta = { error: false, msg: '', data: null };
    spyOn(facturaService, 'guardar').and.returnValue(of(mockRespuesta));
    spyOn(window, 'alert');

    component.facturaForm.controls['tipoModalidad'].setValue(facturaTest.tipoModalidad);
    component.facturaForm.controls['placa'].setValue(facturaTest.placa)
    component.facturaForm.controls['estadoFactura'].setValue(facturaTest.estadoFactura);
    component.facturaForm.value.vehiculo = facturaTest.vehiculo;

    component.ejecutarAccion();
    expect(component.esCrear).toBeTrue();
    expect(window.alert).toHaveBeenCalledWith(CREADO);
  });

  it('deberia sacar error por falta de campo obligatorio la factura', () => {
    mockRespuesta = { error: true, 
                      msg: 'El campo "tipoModalidad" es obligatorio', 
                      data: { 
                        nombreExcepcion: 'ExcepcionValorObligatorio', 
                        mensaje: 'El campo "tipoModalidad" es obligatorio'
                      }
                    };
    spyOn(facturaService, 'guardar').and.returnValue(of(mockRespuesta));
    spyOn(window, 'alert');

    component.facturaForm.controls['tipoModalidad'].setValue(facturaTest.tipoModalidad);
    component.facturaForm.controls['placa'].setValue(facturaTest.placa);
    component.facturaForm.controls['estadoFactura'].setValue(facturaTest.estadoFactura);
    component.facturaForm.value.vehiculo = facturaTest.vehiculo;

    component.guardar();
    expect(window.alert).toHaveBeenCalledWith(mockRespuesta.msg);
  });

  it('deberia Actualizar la factura', () => {
    component.ngOnInit;
    component.esCrear = false;

    mockRespuesta = { error: false, msg: '', data: null };
    let mockRespuestaObtener = { error: false, msg: '', data: facturaTest };

    spyOn(facturaService, 'obtenerPorId').and.returnValue(of(mockRespuestaObtener));
    component.obtenerFacturaPorId(1);

    spyOn(facturaService, 'modificar').and.returnValue(of(mockRespuesta));
    spyOn(window, 'alert');
    
    component.facturaForm.controls['tipoModalidad'].setValue(facturaTest.tipoModalidad);
    component.facturaForm.controls['placa'].setValue(facturaTest.placa)
    component.facturaForm.controls['estadoFactura'].setValue(facturaTest.estadoFactura);
    component.facturaForm.value.vehiculo = facturaTest.vehiculo;
    component.facturaForm.value.id = 1;
    component.facturaForm.value.fechaInicio = "2022-06-25 21:51:05";
  
    component.ejecutarAccion();
    expect(component.esCrear).toBeFalse();
    expect(window.alert).toHaveBeenCalledWith(ACTUALIZADO);
  });

  it('deberia fallar al obtener el id de una factura', () => {
    mockRespuesta = { error: true, 
      msg: 'Factura no encontrada', 
      data: { 
        nombreExcepcion: 'ExcepcionSinDatos', 
        mensaje: 'Factura no encontrada'
      }
    };
    spyOn(facturaService, 'obtenerPorId').and.returnValue(of(mockRespuesta));
    spyOn(window, 'alert');
    component.obtenerFacturaPorId(1);
    expect(window.alert).toHaveBeenCalledWith(mockRespuesta.msg);
  })


});
