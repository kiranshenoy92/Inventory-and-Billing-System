import { Component , OnInit } from "@angular/core";
import { UserService } from "../../../service/user.service";
import { FormBuilder , FormControlName , FormControl , FormGroup , Validators , FormArray } from '@angular/forms';
import { Inventory } from "../../inventory/inventory";
import { Bill } from "../bill";

@Component({
    selector    : 'createBill-component',
    styleUrls   : [ 'client/modules/billing/CreateBillComponent/createBill.component.css' ],
    templateUrl : 'client/modules/billing/CreateBillComponent/createBill.component.html',
    providers   : [ UserService ]
})

export class CreateBillComponent implements OnInit {
    private         receiptDetails;
    private         failDetails;
    count           : number;
    itemFound       : Boolean;
    inventory       : Inventory;
    BillForm        : FormGroup;
    customerName    : FormControl;
    customerAddress : FormControl;
    customerNumber  : FormControl;
    customerEmail   : FormControl;
    biller          : FormControl;
    salesman        : FormControl;
    actualPrice     : FormControl;
    discount        : FormControl;
    taxAmount       : FormControl;
    finalPrice      : FormControl;
    items           : FormArray;
    selecteditemSKU : FormControl;
    itemSKU         : FormControl;
    itemName        : FormControl;
    itemCost        : FormControl;
    itemQuantity    : FormControl;
    itemTotalPrice  : FormControl;
    itemDiscount    : FormControl;
    maxItemQuantity : FormControl;
    quantity        : number;
    //socket        : any;
    constructor(private billFormBuilder :FormBuilder , private userservice :UserService) {

        //this.socket = io('http://localhost:8000');
    
        

        this.customerName     = new FormControl('', Validators.required);
        this.customerAddress  = new FormControl('');
        this.customerNumber   = new FormControl('', Validators.required);
        this.customerEmail    = new FormControl('');
        this.biller           = new FormControl('', Validators.required);
        this.salesman         = new FormControl('');
        this.actualPrice      = new FormControl('');
        this.discount         = new FormControl('');
        this.taxAmount        = new FormControl('');
        this.finalPrice       = new FormControl(0);
        this.itemSKU          = new FormControl('');
        this.items            = new FormArray([]); 
        this.BillForm         = this.billFormBuilder.group({
            "customerName"    : this.customerName,
            "customerAddress" : this.customerAddress,
            "customerNumber"  : this.customerNumber,
            "customerEmail"   : this.customerEmail,
            "biller"          : this.biller,
            "salesman"        : this.salesman,
            "actualPrice"     : this.actualPrice,
            "discount"        : this.discount,
            "taxAmount"       : this.taxAmount,
            "finalPrice"      : this.finalPrice,
            "items"           : this.items,
            "itemSKU"         : this.itemSKU,
        }) 

        

    }

    //function which adds new items in the item araay form
    addItem() {
        //adding new items
        this.items.push(this.initItem());
        //updating the total priceafter each item is added
        this.totalPrice();
    }

    //validator to check that number is not below zero
    validateNumber(itemQuantity : FormControl) {
        //return null that is valid if number greater than 0 or else return false telling invalid value
        return itemQuantity.value>0 ? null : {
            validateNumber: {
                valid: false
            }
        };
    }


     //validator to check that number is not below zero
    validateQuantity(itemQuantity : FormControl) {
        //return null that is valid if number greater than 0 or else return false telling invalid value
        return itemQuantity.value>0 && itemQuantity <= this.maxItemQuantity? null : {
            validateNumber: {
                valid: false
            }
        };
    }


    //validator for discount check as discount should be between 0 and 100
    validateDiscount(Discount : FormControl) {
        //if number between 0 and 100 return null else error
        return (Discount.value<100 && Discount.value >= 0) ? null : {
            validateNumber: {
                valid: false
            }
        };
    }

    onSubmit() {
        
        for(let itemsku of this.BillForm.value.items) {
            console.log(itemsku.selecteditemSKU);
        }
        console.log(this.BillForm);
        this.userservice.generateReceipt(this.customerName.value,this.customerAddress.value, this.customerNumber.value, this.customerEmail.value , this.salesman.value ,this.actualPrice.value , this.discount.value , this.taxAmount.value , this.finalPrice.value, this.items.value)
            .subscribe(res => {
                if(res.success == true) {
                     this.receiptDetails = res       
                } else {
                    this.receiptDetails = res;
                   // alert(res.msg)
                }
            })

    }
    //function to update the price when ever a new item is added
    updatePrice(i) {
        console.log("update price called for "+i);
        
        
        this.items.controls[i].controls.itemTotalPrice
        .setValue(
            (this.items.controls[i].controls.itemQuantity.value 
            * this.items.controls[i].controls.itemCost.value)
            -
            (this.items.controls[i].controls.itemQuantity.value 
            * (this.items.controls[i].controls.itemCost.value 
            * this.items.controls[i].controls.itemDiscount.value)/100))

        this.totalPrice();
        //tthis.items.controls[i].controls.itemQuantity.setValue(this.items.controls[i].controls.itemQuantity.itemQuantity.value * this.items.controls[i].controls.itemQuantity.itemCost.value);
        console.log(this.itemTotalPrice.value);

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


    getItem(SKU : FormControl) {
        console.log("sku sent is"+SKU.value);
        this.itemFound=false;
        this.count      = 0;
        this.quantity   = 1;
        for(let itemsku of this.BillForm.value.items) {
                console.log(itemsku);
                console.log("comparing "+SKU.value+" and "+itemsku.selecteditemSKU); 
                console.log(itemsku);
                if(SKU.value == itemsku.selecteditemSKU) {
                    //increment the count
                    this.itemFound=true;
                          
                    this.inventory._id              = itemsku.selecteditemSKU;
                    this.inventory.product_id.name  = itemsku.itemName;
                    this.inventory.sellingPrice     = itemsku.itemCost;
                    this.quantity                   = (itemsku.itemQuantity+1);
                            
                            
                    this.items.removeAt(this.count);
                    this.itemSKU.reset();
                    this.addItem();

                    break;

                } else {

                    this.itemFound=false;
                }
        this.count++;
        }
        console.log("item found is "+this.itemFound);
        if(this.itemFound==false && this.itemSKU.value){
            this.userservice.getTransactionsDetail(this.itemSKU.value)
                .subscribe(res => {
                    if(res){
                        this.itemSKU.reset();
                        if(res.quantityLeft>0) {
                            console.log(res.product_id.name);
                            this.inventory = res;
                            this.addItem();
                            console.log(this.BillForm.value);
                            
                        } else {
                            alert(res.product_id.name+" with inventory id "+res._id+" out of stock!!!");
                            this.itemSKU.reset();
                        }
                    }  
                }) 
        }
        
           	    
    }

    totalPrice() {
        console.log("total event called");
        this.finalPrice.setValue(0);
        for( let item of this.BillForm.value.items ) {
            this.finalPrice.setValue(this.finalPrice.value + item.itemTotalPrice);
            console.log(this.finalPrice.value)
        }

        
    }

    removeAddress(i) {
         this.items.removeAt(i);
    }

    ngOnInit() {

    }

    reset() {
        this.receiptDetails = undefined;
    }
    initItem() {
        this.itemSKU.reset();
       
        this.maxItemQuantity= new FormControl(this.inventory.quantityLeft);
        //console.log(this.maxItemQuantity.value+"is left");
        this.selecteditemSKU= new FormControl(this.inventory._id);
        this.itemName       = new FormControl(this.inventory.product_id.name);
        this.itemCost       = new FormControl(this.inventory.sellingPrice, [Validators.required, this.validateNumber]);
        this.itemQuantity   = new FormControl(this.quantity, [Validators.required, this.validateNumber]);
        this.itemDiscount   = new FormControl(0,this.validateDiscount);
        this.itemTotalPrice = new FormControl(((this.quantity*this.itemCost.value)-(this.quantity*(this.itemCost.value*this.itemDiscount.value)/100)));
         
        return this.billFormBuilder.group({
            "selecteditemSKU"   : this.selecteditemSKU,
            "itemName"          : this.itemName,
            "itemCost"          : this.itemCost,
            "itemQuantity"      : this.itemQuantity,
            "itemTotalPrice"    : this.itemTotalPrice,
            "itemDiscount"      : this.itemDiscount,
            "maxItemQuantity"   : this.maxItemQuantity
        });     
    }
}