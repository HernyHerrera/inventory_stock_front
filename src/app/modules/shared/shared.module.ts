import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyDirective } from 'ngx-currency';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { AlertComponent } from './components/alert/alert.component';




@NgModule({
  declarations: [
    SidenavComponent,
    FooterComponent,
    ConfirmComponent,
    AlertComponent
    
    
  ],
  exports: [
    SidenavComponent,
    FooterComponent,
   
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxCurrencyDirective
    
    
  ]
})
export class SharedModule { }
