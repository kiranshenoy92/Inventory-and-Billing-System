import { Component , OnInit} from '@angular/core';
import { UserService } from "../../../service/user.service";
import { Supplier } from "../supplier";


@Component({
    selector: 'showSuppliers-component',
    templateUrl: 'client/modules/Suppliers/ShowSuppliersComponent/showSupplier.component.html',
    providers: [ UserService ]
})
export class ShowSupplierComponent implements OnInit{ 
    suppliers : Supplier[];
    constructor ( private userservice : UserService ) {
        
    }

    ngOnInit(){
        
        this.userservice.showSupplier()
            .subscribe(res => {
                this.suppliers = res
                console.log(this.suppliers);
            });
    }
  
}
