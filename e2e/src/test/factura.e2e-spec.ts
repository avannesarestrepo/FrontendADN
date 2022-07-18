import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { FacturaPage } from '../page/factura/factura.po';

describe('workspace-project Factura', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let factura: FacturaPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        factura = new FacturaPage();
    });


    it('Deberia crear y listar una factura ', () => {
        const TIPO_MODALIDAD = 'MENSUAL';
        const PLACA = 'XXX000';
        const ESTADO = 'CONFIRMAR';

        page.navigateTo();
        navBar.clickBotonFactura();
        factura.clickBotonCrearFactura();
        factura.ingresarTipoModalidad(TIPO_MODALIDAD);
        factura.ingresarPlaca(PLACA);
        factura.ingresarEstado(ESTADO);

        factura.clickBotonListarFacturas();
    });

})