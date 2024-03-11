import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRoutingModule } from './modules/dashboard/dashboard-routing.module';
import { RouterChildModule } from './modules/dashboard/router-child.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  DashboardRoutingModule,
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
