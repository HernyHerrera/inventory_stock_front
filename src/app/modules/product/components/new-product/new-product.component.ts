import { Component, Input, OnInit, forwardRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

import { ProductService } from 'src/app/modules/shared/services/product.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  
  selectedValue!: string;

  public productForm!: FormGroup;
  private formB  = inject(FormBuilder);
  
  dataS: any;
  


  ngOnInit(): void {
    this.getCategory();
    this.validations();
    
  }
  getCategory(){
    this.productService.getCategories().subscribe((data) =>{
      this.dataS = data;
      this.dataS = this.dataS.categoryResponse.category;
      console.log(this.dataS) 
    });
  }
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
    this.productService.saveProducts(data)
    .subscribe(data =>{
      console.log(data);
      this.dialogRef.close(1)

    }),(error: any)=>{
      this.dialogRef.close(2)
    }

  }
  onCancel(){

  }
  
 
}
    



