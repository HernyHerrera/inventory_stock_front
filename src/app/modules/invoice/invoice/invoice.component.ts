import { Component, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceService } from '../../shared/services/invoice/invoice.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { NewInvoiceComponent } from '../new-invoice/new-invoice.component';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})

export class InvoiceComponent implements OnInit{
  
  ngOnInit(): void {
    this.getInvoices();
    
  }
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private invoiceService = inject(InvoiceService);
  columnsDisplay: string[] = [ 'invoiceNumber', 'emissionDate', 'businessName'];
  dataSource = new MatTableDataSource<Invoice>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  // obtener facturas
  getInvoices(): void{
    this.invoiceService.getInvoices()
      .subscribe((data:any) =>{
          this.invoiceResponseData(data);
      }, (error:any)=>{
      })
  }
  search(number:any){
    this.invoiceService.getInvoicesByNumber(number)
      .subscribe((resp: any)=>{
        if(resp !=null){
          this.invoiceResponseData(resp);
        }
      },(error)=>{
        this.alerta("Número de factura no encontrada");
        this.getInvoices();
      }
      )
  }
  alerta(message: string, title = 'Factura no encontrada', okCallback: () => void = () => { }) {
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
  // modelar respuesta
  invoiceResponseData(resp:any){
    const dataInvoice: Invoice[] = [];
  
    if(resp!= null){
      let listInvoice = resp;

      listInvoice.forEach((element: Invoice)  => {
        dataInvoice.push(element)
        
      });
      this.dataSource = new MatTableDataSource<Invoice>(dataInvoice);
      this.dataSource.paginator = this.paginator; 
    }
  }
  // abrir ventana añadir factura
  showProduct(){
    const dialogRef = this.dialog.open(NewInvoiceComponent  ,{
      width: "90%",
      height:"90%"
      
    });
    dialogRef.afterClosed().subscribe((result: any)=>{
      if(result==1){
        this.openSnack("Producto agregado", "Exitosa");
        this.getInvoices();
      }else if(result==2){
        this.openSnack("Error al guardar producto", "Error");
      }
    })
  }
  //mensaje
  openSnack(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action,{
      duration: 3000
    })
  }
}
//interface factura
export interface Invoice{
  
  invoiceNumber: number;
  emissionDate: Date;
  businessName: number;
  
}
export interface DialogData {
  message: string;
  title: string;
}

