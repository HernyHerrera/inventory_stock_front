import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{

  menuNav =[
    {name: "Inicio", route: "home", icon:"home"},
    {name: "Facturas", route: "home", icon:"receipt_long"},
    {name: "Productos", route: "product", icon:"production_quantity_limits"},
    {name: "Stock", route: "home", icon:"inventory"}
  ]

  ngOnInit(): void {
      
  }

}
