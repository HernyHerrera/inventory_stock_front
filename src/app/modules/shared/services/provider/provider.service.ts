import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const url_base = "http://localhost:8080/inventory";
//const url_base = "https://inventorycontrol-vjngxkkrzq-no.a.run.app/inventory";

@Injectable({
  providedIn: 'root'
})

export class ProviderService {

  constructor(private http: HttpClient) { }
  /** obtener proveedor */

    getProvider(nif){
      const endpoind = `${url_base}/getProvider?nif="${nif}"`;
      return this.http.get(endpoind);

    }
}
