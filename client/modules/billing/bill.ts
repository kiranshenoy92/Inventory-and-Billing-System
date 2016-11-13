export interface Bill {
    customerName    : string;
    mobileNumber    : number;
    email           : string;
    address         : string;
    biller          : string;
    salesman        : string;
    searchSKU       : number;
    items : [{
        itemSKU     : number;
        itemName    : string;
        unitCost    : number;
        quantity    : number;
        discount    : number;
        price       : number;
    }]
};