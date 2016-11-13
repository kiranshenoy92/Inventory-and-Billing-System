import { Component , OnInit} from '@angular/core';
import { UserService } from "../../../service/user.service";
import { Employee } from "../employees";


@Component({
    selector: 'showEmployee-component',
    templateUrl: 'client/modules/Employees/ShowEmployeesComponent/showEmployee.component.html',
    providers: [ UserService ]
})
export class ShowEmployeeComponent implements OnInit{ 
    count:number=0;
    employees : Employee[];
    constructor ( private userservice : UserService ) {
        
    }

    ngOnInit(){
        console.log("here")
        this.userservice.showEmployee()
            .subscribe(res => {
                this.employees = res
            });
    }
  
}
