import { Component, Input, OnInit, forwardRef, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

import { ProductService } from 'src/app/modules/shared/services/product/product.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductComponent } from '../product/product.component';




@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NewProductComponent),
      multi: true,
    }
  ]
  
})
export class NewProductComponent implements OnInit{

  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  estadoForm = "Agregar nuevo ";
  selectedValue!: string;
  public productForm!: FormGroup;
  private formB  = inject(FormBuilder);

  dataS: any;
  
  ngOnInit(): void {
    this.getCategory();
    this.validations();
    if(this.data != null){
      this.estadoForm = "Actualizar"
      this.updateForm(this.data)
    } 
  }
  //obtener categoria
  getCategory(){
    this.productService.getCategories().subscribe((data) =>{
      this.dataS = data;
      this.dataS = this.dataS.categoryResponse.category;
    });
  }
  // validar formulario
  validations(){
    this.productForm = this.formB.group({
      idCategory: [0, Validators.required],
      code: [0, Validators.required],
      name: ['', Validators.required],
      stock: [0, Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
    })
  }
  // guardar
  onSave(){
    let data={
      code: this.productForm.get('code')?.value,
      idCategory: this.productForm.get('idCategory')?.value,
      name: this.productForm.get('name')?.value,
      stock: this.productForm.get('stock')?.value,
      description: this.productForm.get('description')?.value,
      price: this.productForm.get('price')?.value,
      idUser: 1
    }
    if(this.data != null){
      //actualizar producto
      this.productService.updateProducts(data, this.data.id)
        .subscribe((data: any) =>{
          this.dialogRef.close(1);
        }, (error:any) =>{
          this.dialogRef.close(2);
        })
    }else{
      //crear producto
      this.productService.saveProducts(data)
      .subscribe(data =>{
        this.dialogRef.close(1)
  
      }),(error: any)=>{
        this.dialogRef.close(2)
      }
    }
  }
  // cancelar
  onCancel(){
    this.dialogRef.close(3);
  }
  // actualizar formulario
  updateForm(data: any){
    this.productForm = this.formB.group({
      idCategory: [data.idCategory, Validators.required],
      name: [data.name, Validators.required],
      stock: [data.stock, Validators.required],
      description: [data.description, Validators.required],
      price: [data.price, Validators.required],
      code: new FormControl({value: data.code, disabled: true}) 
    })
  }
}
    



