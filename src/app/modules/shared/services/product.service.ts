import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url_base = "http://localhost:8080/inventory";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  /** obtener productos */

    getProducts(){
      const endpoind = `${url_base}/productslist`;
      return this.http.get(endpoind);

    }
     /** obtener productos */

     getCategories(){
      const endpoind = `${url_base}/categories`;
      return this.http.get(endpoind);

    }
    /**
     *  guardar productos
     */
    saveProducts(body:any){
      const endpoind = `${url_base}/products`;
      return this.http.post(endpoind, body);

    }
}
