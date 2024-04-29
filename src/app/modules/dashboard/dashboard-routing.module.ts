import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLink} from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { InvoiceComponent } from '../invoice/invoice/invoice.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent, 
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
   
})
export class DashboardRoutingModule { }
