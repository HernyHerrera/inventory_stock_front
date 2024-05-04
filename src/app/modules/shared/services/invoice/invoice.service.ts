import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url_base = "http://localhost:8080/inventory";
//conexion para la aplicación desplegada en GCP
//const url_base="https://inventorycontrol-vjngxkkrzq-no.a.run.app/inventory"

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }
   /** obtener facturas */
  getInvoices(){
    const endpoind = `${url_base}/invoiceslist`;
    return this.http.get(endpoind);
  }
   /**
     *  guardar facturas
     */
   saveInvoices(body:any){
    const endpoind = `${url_base}/invoices`;
    return this.http.post(endpoind, body);

  }
  /**
     *  guardar facturas con productos
     */
  saveInvoiceProducts(body:any){
    const endpoind = `${url_base}/productinvoices`;
    return this.http.post(endpoind, body);

  }
  getInvoicesByNumber(number: any){
    const endpoind = `${url_base}/invoices/${number}`;
    return this.http.get(endpoind);
  }



}
