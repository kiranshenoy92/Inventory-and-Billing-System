import { Component } from '@angular/core';
import { UserService } from "../../service/user.service";

@Component({
    selector: 'navbar-component',
    templateUrl: 'client/components/NavbarComponent/navbar.component.html',
    providers: [ UserService ]
})
export class NavbarComponent { 
    constructor ( private userservice : UserService) {

    }
    logout() {
         this.userservice.logout();
         location.reload();
    }
}
