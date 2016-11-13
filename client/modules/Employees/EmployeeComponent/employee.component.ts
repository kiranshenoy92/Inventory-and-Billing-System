import { Component , OnInit} from '@angular/core';
import { UserService } from "../../../service/user.service";
import { ActivatedRoute } from "@angular/router";
import { Employee } from "../employees";

@Component({
    selector: 'employee-component',
    templateUrl: 'client/modules/Employees/EmployeeComponent/employee.component.html',
    providers: [ UserService ]
})
export class EmployeeComponent implements OnInit{ 

    employee : Employee;
    constructor ( private userservice : UserService , private _route : ActivatedRoute) {

    }
    ngOnInit(){
        this._route.params
            .map(params => params["id"])
            .subscribe((id) => {
                this.userservice.showProfile(id)
                    .subscribe(res => {
                        this.employee = res
                    })
                    
            })
    }
}
   