import { Component, OnInit} from '@angular/core';
import { UserService } from "../../../service/user.service";

@Component({
    selector : 'billDetail-component',
    templateUrl : 'client/modules/billing/BillDetailsComponent/billDetail.component.html',
    styleUrls   : [ 'client/modules/billing/BillDetailsComponent/billDetail.component.css' ],
    inputs : ['receipt','id']
})


export class BillDetailsComponent implements OnInit {
    constructor(private userservice : UserService) {

    }
    ngOnInit() {

    }

    printBill(receiptID) {
        console.log("receipt id "+receiptID);
        this.userservice.getPDF(receiptID)
            .subscribe(res => {
                            saveAs(res,"InvoiceNo"+receiptID+".pdf");
                            let fileURL = URL.createObjectURL(res);
                            window.open(fileURL);
                        })
    }
} 