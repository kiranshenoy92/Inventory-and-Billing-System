import { Component,OnInit,Input , Output, EventEmitter} from '@angular/core';
import { UserService } from '../../../service/user.service';
import { FormBuilder , FormControl , FormGroup , Validator } from '@angular/forms';

@Component ({
    selector    : 'editItem-component',
    styleUrls   : [ 'client/modules/billing/CreateBillComponent/createBill.component.css' ],
    templateUrl : 'client/modules/inventory/EditItemComponent/editItem.component.html',
    providers   : [ UserService ],
    outputs : ['priceChange']
})

export class editItem implements OnInit{

    @Input() item;
    
    priceChange     = new EventEmitter();
    itemCost        : FormControl;
    sellingPrice    : FormControl;
    minSellingPrice : FormControl;
    itemEditForm    : FormGroup;
    successFlag     : boolean;

    constructor(private itemEditFormBuilder : FormBuilder, private userservice : UserService) {
        this.itemEditForm = this.itemEditFormBuilder.group({
            "itemCost"          : this.itemCost,
            "sellingPrice"      : this.sellingPrice,
            "minSellingPrice"   : this.minSellingPrice
        })
    }
    ngOnInit() {
        this.itemCost           = new FormControl(this.item.purchaseCost);
        this.sellingPrice       = new FormControl(this.item.sellingPrice);
        this.minSellingPrice    = new FormControl(this.item.minSellingPrice); 
        
    }
    setValue() {
        this.successFlag        = undefined;
        this.itemCost           = new FormControl(this.item.purchaseCost);
        this.sellingPrice       = new FormControl(this.item.sellingPrice);
        this.minSellingPrice    = new FormControl(this.item.minSellingPrice); 
    
    }

    onSubmit() {
        this.userservice.editInventory(this.item._id,this.itemCost.value,this.sellingPrice.value,this.minSellingPrice.value)
                        .subscribe(res => {
                            if(res.success){
                                this.successFlag = true;
                                this.priceChange.emit([this.itemCost.value,this.sellingPrice.value,this.minSellingPrice.value])
                            } else {
                                this.successFlag = false;
                            }
                        });
    }

}