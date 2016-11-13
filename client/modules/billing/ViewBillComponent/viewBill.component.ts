import { Component,OnInit } from "@angular/core";
import { UserService } from "../../../service/user.service";
import { Bill } from "../bill";


@Component({
    selector : 'vieweBill-component',
    templateUrl : 'client/modules/billing/ViewBillComponent/viewBill.component.html'
})

export class ViewBillComponent implements OnInit{
    receipts : Bill;

    constructor(private userservice : UserService) {

    }
    ngOnInit() {
        this.userservice.getReceipts()
                        .subscribe(res=>{
                            this.receipts = res;
                            console.log(this.receipts);
                        })
    }


}