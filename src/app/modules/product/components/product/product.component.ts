import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/modules/shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  
  private productService = inject(ProductService)


  ngOnInit(): void {
    this.getProducts();
  }
  columnsDisplay: string[] = [ 'code', 'name', 'description', 'price', 'stock', 'actions'];
  dataSource = new MatTableDataSource<Product>();

  getProducts(): void{
    this.productService.getProducts()
      .subscribe((data:any) =>{
        
        console.log("respuesta pruducts : ", data);
        this.productResponseData(data);
      }, (error:any)=>{
        console.log("error: ", error);
      }) 

      
  }
  productResponseData(resp:any){
    const dataProduct: Product[] = [];
  
    if(resp.metadata[0].code == "00"){
     

      let listProduct = resp.productResponse.product;

      listProduct.forEach((element: Product)  => {
        dataProduct.push(element)
        
      });
     
      this.dataSource = new MatTableDataSource<Product>(dataProduct);
      

    }
  }

}
export interface Product{
  id: number;
  code: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  idCategory: any;
  idUser: number;
}
