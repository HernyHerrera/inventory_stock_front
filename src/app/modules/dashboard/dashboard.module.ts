import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ProductModule } from '../product/product.module';
import { InvoiceModule } from '../invoice/invoice.module';
import { StockModule } from '../stock/stock.module';




@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductModule,
    InvoiceModule,
    StockModule
  ]
})
export class DashboardModule { }
