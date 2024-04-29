import { ChangeDetectorRef, Component, OnInit, forwardRef, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InvoiceService } from '../../shared/services/invoice/invoice.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product/product.service';
import { ProviderService } from '../../shared/services/provider/provider.service';
import { DateAdapter } from '@angular/material/core';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css'],
  providers: [DatePipe]

  
  
})
export class NewInvoiceComponent implements OnInit{
  ngOnInit(): void {
    this.validations()
    this.dateAdapter.setLocale('en-GB')
  }

  private productService = inject(ProductService);
  private providerService = inject(ProviderService);
  private invoiceService = inject(InvoiceService);
  private dialogRef = inject(MatDialogRef);
  private dateAdapter = inject(DateAdapter<Date>);
  private pipeDate = inject(DatePipe);
  estadoForm: string = "Añadir";
  public productForm!: FormGroup;
  public invoiceForm!: FormGroup;
  private formB  = inject(FormBuilder);
  dataS: any;
  providerN: any;
  providerId: any; 
  todayF: any = new Date();
  
  //validar formulario
  validations(){
    this.invoiceForm = this.formB.group({
      invoiceNumber: ["", Validators.required],
      emissionDate: ["", Validators.required],
      provider: ["", Validators.required],
      providerName: new FormControl({value: "",disabled: true}),
      providerId: [""],
      products: this.formB.array([])
    });
  };
  // products del formulario
  get products(){
    return this.invoiceForm.controls['products'] as FormArray;
  }
  // obtener proveedor por el nif
  getProvider(nif: string){
    this.providerService.getProvider(nif).subscribe((data:any)=>{
      this.providerId = data.id;
      if(data.id>0){
        this.providerN = data.businessName;
        this.invoiceForm.patchValue({
          providerId: this.providerId
        })
      }else{
        this.invoiceForm.patchValue({
          providerName: ""
        });
        this.invoiceForm.controls['provider'].setErrors({noExist: "no existe proveedor"});
      } 
    }) 
  }
  // agregar producto
  addProduct(){
    const product = (this.formB.group({
      productCode: ["", Validators.required],
      productName: new FormControl({value: "",disabled: true}),
      productCount: ["", Validators.min(1)],
      }))/** obtener productos */
      this.products.push(product);
  }
  // obtener producto por el codigo
  getProduct( code: number, i: number){
    this.productService.getProductByCode(code).subscribe((data: any) =>{
      if(data.code > 0){
        const myForm = (<FormArray>this.invoiceForm.get('products')).at(i);
        let currentVal = data.name;
        this.dataS = data.name
        myForm.patchValue({
          productName: currentVal,
        })
      }else{
        const myForm = (<FormArray>this.invoiceForm.get('products')).at(i);
        myForm.patchValue({
          productName: "",})
        myForm.get("productCode")?.setErrors({noExist: "Codigo de producto no existe" });
      } 
    }); 
  }
  // borrar producto
  deleteProduct(index: number){
    this.products.removeAt(index);
  }
  updateQuantity(code: number, quantity: number){
    let product= {code: code,
      stock: quantity};
      this.productService.updateQuantity(product).subscribe((data:any)=>{
      }); 
    }
  saveProducts(){
    const productos = this.invoiceForm.get('products')?.value;
    for(let producto of productos){
      let dataProduct={
        invoiceNumber: this.invoiceForm.get('invoiceNumber')?.value,
        productCode: producto.productCode,
        quantity: producto.productCount,
      }; 
      this.invoiceService.saveInvoiceProducts(dataProduct).subscribe((data:any)=>{
        if(data.productInvoiceResponse.productInvoice[0].id>0){
          this.updateQuantity(dataProduct.productCode, dataProduct.quantity);
        }
      })
    }
  }
  onSaveInvoice(){
    let dataInvoice={
      invoiceNumber: this.invoiceForm.get('invoiceNumber')?.value,
      emissionDate: Date.parse(this.pipeDate.transform(this.invoiceForm.get('emissionDate')?.value, 'yyyy/MM/dd', 'en-GB')),
      idUser: 1,
      idProvider: this.invoiceForm.get('providerId')?.value 
    }; 
    try{
      this.invoiceService.saveInvoices(dataInvoice).subscribe((dataInvoice:any)=>{
        this.saveProducts();
        this.dialogRef.close(1);  
      }, (error:any) =>{
      this.dialogRef.close(2);
      }) 
    }catch(error){
      alert("Ha ocurrido un error al guardar")
    }
    
  }
  verify(){
    if(Date.parse(this.pipeDate.transform(this.invoiceForm.get('emissionDate')?.value, 'yyyy/MM/dd', 'en-GB')) > Date.parse( this.pipeDate.transform(this.todayF, 'yyyy/MM/dd','en-GB'))){
      this.invoiceForm.controls['emissionDate'].setErrors({outRange: 'fecha fuera de limite'});    
    }  
   
  }
  // cancelar
  onCancel(){
    this.dialogRef.close(3);
  }

}
export interface Product{
  
  productCode: number;
  productName: string
  productCount: number;
  
}
