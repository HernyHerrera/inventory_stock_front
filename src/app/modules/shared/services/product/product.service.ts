import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url_base = "http://localhost:8080/inventory";
//const url_base="https://inventorycontrol-vjngxkkrzq-no.a.run.app/inventory"

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
    /** obtener producto por código */
    getProductByCode(code:number){
      const endpoind=`${url_base}/getProduct?code=${code}`
      return this.http.get(endpoind);
    }
    getProduct(code:number, category:number){
      const endpoind=`${url_base}/productslist?code=${code}&id=${category}`
      return this.http.get(endpoind);
    }
     /** obtener categorias */

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
    /**
     * actualizar productos
     */
    updateProducts(body:any, id: any){
      const endpoind = `${url_base}/products/${id}`;
      console.log(this.http.put(endpoind, body));
      return this.http.put(endpoind, body);
    }
    
    updateQuantity(body:any){
      const endpoind = `${url_base}/updateQuantity`;
      return this.http.put<any>(endpoind, body);
    }
     /**
     * eliminar producto
     */
     deleteProducts(id: any){
      const endpoind = `${url_base}/products/${id}`;
      return this.http.delete(endpoind);
    }
}
