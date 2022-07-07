import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Factura } from '@factura/shared/model/factura';
import { Vehiculo } from '@factura/shared/model/vehiculo';
import { FacturaService } from '@factura/shared/service/factura.service';

import { CrearFacturaComponent } from './crear-factura.component';

describe('CrearFacturaComponent', () => {
  let fixture: ComponentFixture<CrearFacturaComponent>;
  let component: CrearFacturaComponent;
  /*protected facturaService: FacturaService, private router: Router, private route: ActivatedRoute*/
  //let facturaService: FacturaService;
  let facturaTest: Factura;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearFacturaComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        HttpService,
        FacturaService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearFacturaComponent);
    component = fixture.componentInstance;
    facturaTest = new Factura(1, 'MENSUAL', new Vehiculo('XXX000') , 'XXX000', 'CONFIRMADO');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('el formulario deberia ser invalido por falta de campo obligatorio', () => {
    component.ngOnInit();
    expect(component.facturaForm.valid).toBeFalsy();
  });

  it('el formulario deberia ser valido', () => {
    component.facturaForm.controls['tipoModalidad'].setValue(facturaTest.tipoModalidad);
    component.facturaForm.controls['placa'].setValue(facturaTest.placa);
    component.facturaForm.controls['estadoFactura'].setValue(facturaTest.estadoFactura);

    expect(component.facturaForm.valid).toBeTrue();
  });

  it('deberia guardar la factura', () => {
    component.facturaForm.controls['tipoModalidad'].setValue(facturaTest.tipoModalidad);
    component.facturaForm.controls['placa'].setValue(facturaTest.placa)
    component.facturaForm.controls['estadoFactura'].setValue(facturaTest.estadoFactura);
    component.facturaForm.value.vehiculo = facturaTest.vehiculo;

    component.ejecutarAccion();
    expect(component.esCrear).toBeTrue();
  });

  it('deberia Actualizar la factura', () => {
    component.facturaForm.controls['tipoModalidad'].setValue(facturaTest.tipoModalidad);
    component.facturaForm.controls['placa'].setValue(facturaTest.placa)
    component.facturaForm.controls['estadoFactura'].setValue(facturaTest.estadoFactura);
    component.facturaForm.value.vehiculo = facturaTest.vehiculo;
    component.facturaForm.value.id = 1;

    component.esCrear = false;
    component.ejecutarAccion();
    expect(component.esCrear).toBeFalse();
  });



});
