import { Component, Input, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { NewProductComponent } from '../new-product/new-product.component';
import { MatSelectionList } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  
  private productService = inject(ProductService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  selectedValue!: string;
  dataS: any;
  

  ngOnInit(): void {
    this.getProducts();
    this.getCategory();
    
    
    
  }
  columnsDisplay: string[] = [ 'code', 'nameProduct','category', 'description', 'price', 'stock', 'actions'];
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
  
    if(resp!= null){
     

      let listProduct = resp;

      listProduct.forEach((element: Product)  => {
        dataProduct.push(element)
        
      });
     
      this.dataSource = new MatTableDataSource<Product>(dataProduct);
      

    }
  }
  getCategory(){
    this.productService.getCategories().subscribe((data) =>{
      this.dataS = data;
      this.dataS = this.dataS.categoryResponse.category;
      console.log(this.dataS) 
    });
  }

 

  showProduct(){
    const dialogRef = this.dialog.open(NewProductComponent  ,{
      width: "550px"
      
    });
    dialogRef.afterClosed().subscribe((result: any)=>{
      if(result==1){
        this.openSnack("Producto agregado", "Exitosa");
        this.getProducts();
      }else if(result==2){
        this.openSnack("Error al guardar producto", "Error");

      }
      
    })
  }
  openSnack(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action,{
      duration: 3000
    })

  }

}
export interface Product{
  
  code: number;
  nameProduct: string;
  description: string;
  price: number;
  stock: number;
  category: any;
  
}

