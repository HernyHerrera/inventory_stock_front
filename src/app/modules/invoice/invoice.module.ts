import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxCurrencyDirective } from 'ngx-currency';
import { MaterialModule } from '../shared/material.module';
import { InvoiceComponent } from './invoice/invoice.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { RouterLink, RouterModule } from '@angular/router';
import { RouterChildModule } from '../dashboard/router-child.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    InvoiceComponent,
    NewInvoiceComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    NgxCurrencyDirective,
    MatSelectModule,
    RouterModule,
    RouterLink,
    MatPaginatorModule,
    BrowserAnimationsModule

  ]
})
export class InvoiceModule { }
