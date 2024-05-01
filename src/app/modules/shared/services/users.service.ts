import { Injectable, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private keycloackService = inject(KeycloakService);

  constructor() { }

  getUser(){
    return this.keycloackService.getUserRoles();
  }
  isAdmin(){
    var role = this.keycloackService.getUserRoles().filter(role => role == "admin");

    if (role.length < 1){
      return false;
    }else{
      return true;
    }
  }
}
