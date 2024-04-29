import { Component, Inject, Input, OnInit, ViewChild, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/modules/shared/services/product/product.service';
import { NewProductComponent } from '../new-product/new-product.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';
import { AlertComponent } from 'src/app/modules/shared/components/alert/alert.component';


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
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  // obtener productos
  getProducts(): void{
    this.productService.getProducts()
      .subscribe((data:any) =>{
        this.productResponseData(data);
      }, (error:any)=>{
        console.log("error: ", error);
      })     
  }
  getProductByCode(code:any, category:any){
    if(category==null || category== undefined){
      category = "";
    }
    this.productService.getProduct(code, category)
    .subscribe((data:any)=>{
      console.log(data)
      console.log(code, category)
      this.productResponseData(data);
    },(error)=>{
      this.alerta("Sin resultados")
    }) 
  }
  alerta(message: string, title = 'Producto no encontrado', okCallback: () => void = () => { }) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '300px',
      data: { message: message, title: title },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && okCallback) {
        okCallback();
      }
    });
  }
  // modela la respuesta
  productResponseData(resp:any){
    const dataProduct: Product[] = [];
  
    if(resp!= null){
     
      let listProduct = resp;

      listProduct.forEach((element: Product)  => {
        dataProduct.push(element) 
      });
     
      this.dataSource = new MatTableDataSource<Product>(dataProduct);
      this.dataSource.paginator = this.paginator;
    }
  }

  // obtener categorias
  getCategory(){
    this.productService.getCategories().subscribe((data) =>{
      this.dataS = data;
      this.dataS = this.dataS.categoryResponse.category;
    });
  }

  // mostar ventana agregar producto
  showProduct(){
    const dialogRef = this.dialog.open(NewProductComponent  ,{
      width: "600px"
      
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
  // editar producto
  edit(id:number, code:number, name:string, description: string, price: number, stock: number, category:any){
    const dialogRef = this.dialog.open(NewProductComponent  ,{
      data: {id:id, code:code, name: name, description: description, price: price, stock: stock, category: category} 
    });
    dialogRef.afterClosed().subscribe((result: any)=>{
      if(result==1){
        this.openSnack("Producto actualizado", "Exitosa");
        this.getProducts();
      }else if(result==2){
        this.openSnack("Error al actualizar producto", "Error");
      }
      
    })
  }
  // eliminar producto
  delete(id:number){
    const dialogRef = this.dialog.open(ConfirmComponent  ,{
      data: {id:id}  
    });
    dialogRef.afterClosed().subscribe((result: any)=>{
      if(result==1){
        this.openSnack("Producto borrado", "Exitosa");
        this.getProducts();
      }else if(result==2){
        this.openSnack("Error al borrar producto", "Error");

      }
      
    })
  }
  // mensaje
  openSnack(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action,{
      duration: 3000
    })

  }
}

// interface product
export interface Product{
  
  code: number;
  nameProduct: string;
  description: string;
  price: number;
  stock: number;
  category: any;
  
}
export interface DialogData {
  message: string;
  title: string;
}


