import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ProductModule } from '../product/product.module';
import { ProductComponent } from '../product/components/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
