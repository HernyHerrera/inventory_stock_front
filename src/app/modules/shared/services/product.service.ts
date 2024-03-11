import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url_base = "http://localhost:8080/inventory";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  /** obtener categorias */

    getProducts(){
      const endpoind = `${url_base}/products`;
      return this.http.get(endpoind);

    }
}
