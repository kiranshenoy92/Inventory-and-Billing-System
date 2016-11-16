import { ChangeDetectionStrategy,Component,OnInit } from "@angular/core";
import { PaginatePipe , PaginationControlsComponent , PaginationService} from "ng2-pagination";
import { UserService } from "../../../service/user.service";

import { Bill } from "../bill";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Component({
    selector : 'vieweBill-component',
   styleUrls   : ['client/modules/billing/ViewBillComponent/viewBill.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl : 'client/modules/billing/ViewBillComponent/viewBill.component.html',
    
})

export class ViewBillComponent implements OnInit{
    receipts : Bill[] = [];
    private asyncreceipts: Observable<Bill[]>;
    page: number = 1;
    total: number;
    loading: boolean;

    constructor(private userservice : UserService) {
         console.log("logged in as"+this.userservice.getName());
    }
    ngOnInit() {
        
        this.getPage(1);    
        
    }

    getPage(page: number ) {
        
        this.loading = true;
        console.log("inside get bill");
        this.asyncreceipts =  this.userservice.getReceipts(page)
            .do(res => {
                this.total = res.total;
                this.page = page;
                this.loading = false;
            })
            .map(res => res.item)
            

    }
    
}