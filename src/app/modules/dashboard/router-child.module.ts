import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from '../product/components/product/product.component';
import { InvoiceComponent } from '../invoice/invoice/invoice.component';
import { NewInvoiceComponent } from '../invoice/new-invoice/new-invoice.component';
import { StockComponent } from '../stock/stock/stock.component';


const childRoutes: Routes = [
    {path: "", component: HomeComponent},
    {path: "home", component: HomeComponent},
    {path: "product", component: ProductComponent},
    {path: "invoice", component: InvoiceComponent},
    {path: "newinvoice", component: NewInvoiceComponent},
    {path: "stock", component: StockComponent}

]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule],
    
})
export class RouterChildModule { }
