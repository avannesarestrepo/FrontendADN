export interface Propietario {
    id: number;
    tipoDocumento: string;
    documento: string;
    nombreCompleto: string;
    email: string;
    telefono: number;

    /*constructor(id: number, tipoDocumento: string, documento: string, nombreCompleto: string, email: string, telefono: number){
        this.id = id;
        this.tipoDocumento = tipoDocumento;
        this.documento = documento;
        this.nombreCompleto = nombreCompleto;
        this.email = email;
        this.telefono = telefono;
    }*/
}