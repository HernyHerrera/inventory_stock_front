import { Component, OnInit, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{
  private keycloackService = inject(KeycloakService)
  username: any;


  menuNav =[
    {name: "Inicio", route: "home", icon:"home"},
    {name: "Facturas", route: "invoice", icon:"receipt_long"},
    {name: "Productos", route: "product", icon:"production_quantity_limits"},
    {name: "Stock", route: "stock", icon:"inventory"}
  ]

  ngOnInit(): void {
      this.username = this.keycloackService.getUsername();
      
  }
  login(){
    this.keycloackService.login();
  }
  logout(){
    this.keycloackService.logout();
  }

}
