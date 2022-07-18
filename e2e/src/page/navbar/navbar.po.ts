import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));
    linkFactura = element(by.xpath('/html/body/app-root/app-navbar/nav/a[3]'));

    async clickBotonFactura() {
        await this.linkFactura.click();
    }
}
