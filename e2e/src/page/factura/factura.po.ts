import { by, element } from 'protractor';

export class FacturaPage {
    private linkCrearFactura = element(by.id('linkCrearFactura'));
    private linkAnularFactura = element(by.id('anularFactura'));
    private linkListaFacturas = element(by.id('linkListarFacturas'));
    private inputTipoModalidad = element(by.id('tipoModalidad'));
    private inputPlaca = element(by.id('placa'));
    private inputEstado = element(by.id('estadoFactura'));

    async clickBotonCrearFactura() {
        await this.linkCrearFactura.click();
    }

    async clickBotonListarFacturas(){
        await this.linkListaFacturas.click();
    }

    async clickBotonAnularFactura() {
        await this.linkAnularFactura.click();
    }

    async ingresarTipoModalidad(tipoModalidad) {
        await this.inputTipoModalidad.sendKeys(tipoModalidad);
    }

    async ingresarPlaca(placa) {
        await this.inputPlaca.sendKeys(placa);
    }

    async ingresarEstado(estado) {
        await this.inputEstado.sendKeys(estado);
    }

}