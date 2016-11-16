// user.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/mergeMap';
import { Bill } from '../modules/billing/bill';

@Injectable()
export class UserService {
  private loggedIn:boolean = false;
  private Admin:boolean = false;
  private username:string;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    this.Admin = !!localStorage.getItem('Admin');
  }

  
    //LOGIN SERVICE
  login(username, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');


    return this.http
      .post(
        '/auth/login', 
        JSON.stringify({ username, password }), 
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.user.adminAccess) {
          localStorage.setItem('auth_token', res.token);
          localStorage.setItem('Admin',"true");
          localStorage.setItem('Username',res.user.name);
          this.username = res.user.name;
          
          this.Admin = true;
          return res.success;
        }
        if (res.success) {
          localStorage.setItem('auth_token', res.token);
          //this.username = res.username;
          this.loggedIn = true;
          return res.success;
        }
      });
  };


  //ADD NEW EMPLOYEE SERVICE
  addEmployee(username, password, firstname, secondname, address, mobileNumber, dob, joiningDate, adminRights){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
     headers.append('Authorization', localStorage.getItem('auth_token') );
    return this.http
    .post('/api/addEmployee',JSON.stringify
    ({
      username, password, firstname, secondname, address, mobileNumber, dob, joiningDate, adminRights
    }),
    { headers }
    )
    .map( res => res.json())
  }

  showProfile(id) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',localStorage.getItem('auth_token'));

    return this.http
                .get('/api/profile/'+id , { headers })
                .map( res => res.json());

  }

  showEmployee(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',localStorage.getItem('auth_token'));

    return this.http
                .get('/api/listEmployees', {headers})
                .map( res => res.json())

  }


  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('Admin');
    this.loggedIn = false;
    this.Admin = false;
    console.log("logged out");
  }

  isLoggedIn() {
    console.log("login is "+this.loggedIn);
    return this.loggedIn;
  }
   isAdminIn() {
    console.log("afmin is "+this.Admin);
    return this.Admin;
  }
  getName() {
    //console.log(this.username);
    return   localStorage.getItem('Username');
  }


  
  //ADD NEW EMPLOYEE SERVICE
  addSuppier(supplierName, location,address, mobileNumber, bank_details){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
     headers.append('Authorization', localStorage.getItem('auth_token') );
    return this.http
    .post('/api/addSupplier',JSON.stringify
    ({
      supplierName, location, mobileNumber, address, bank_details
    }),
    { headers }
    )
    .map( res => res.json())
  }

    showSupplier(){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',localStorage.getItem('auth_token'));

      return this.http
                  .get('/api/listSuppliers', {headers})
                  .map( res => res.json())

  }

    showSupplierProfile(supid) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',localStorage.getItem('auth_token'));

    return this.http
                .get('/api/supplier_profile/'+supid, {headers})
                .map( res => res.json());
  }


    addInventory(supplier_id,product_id,product_sku,quantity,cp,sp,msp){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', localStorage.getItem('auth_token') );
      return this.http
      .post('/api/addInventory',JSON.stringify
      ({
        supplier_id,product_id,product_sku,quantity,cp,sp,msp
      }),
      { headers }
      )
      .map( res => res.json())
  }


  showInventory(){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',localStorage.getItem('auth_token'));

      return this.http
                  .get('/api/inventoruList', {headers})
                  .map( res => res.json())

  }

  editInventory(inventoryID,itemCost : number,sellingPrice :number,minSellingPrice :number) {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',localStorage.getItem('auth_token'));

      return this.http
                  .put('/api/editInventory/'+inventoryID, JSON.stringify({
                    itemCost,sellingPrice,minSellingPrice
                  }), {headers})
                  .map( res => res.json());
  }

  getTransactions(supid) {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',localStorage.getItem('auth_token'));

      return this.http  
                  .get('/api/supplierTransactions/'+supid, {headers})
                  .map( res => res.json())
  }

  addProduct(name,description,sku){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',localStorage.getItem('auth_token'));

      return this.http
                  .post('/api/addProduct', JSON.stringify
                  ({
                    name,description,sku
                  })
                  ,{headers})
                  .map( res => res.json())


  }

  getProducts() {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',localStorage.getItem('auth_token'));

      return this.http
                  .get('/api/productList', {headers})
                  .map(res => res.json());
  }

  getProductProfile(productid) {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',localStorage.getItem('auth_token'));

      return this.http
                  .get('/api/product_profile/'+productid , {headers})
                  .map( res => res.json());
  }

  getTransactionsDetail(transactionid) {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',localStorage.getItem('auth_token'));

      return this.http
                  .get('/api/transactionDetail/'+transactionid, {headers})
                  .map( res => res.json());
  }
  getProductTransactions(productid) {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',localStorage.getItem('auth_token'));

      return this.http
                  .get('/api/productTransaction/'+productid , {headers})
                  .map(res =>res.json());
  }



  generateReceipt(customerName,customerAddress, customerNumber, customerEmail , salesman ,actualPrice , discount , taxAmount , finalPrice, items) {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',localStorage.getItem('auth_token'));

        return this.http
                  .post('/api/createReceipt', JSON.stringify
                  ({
                    customerName, customerAddress, customerNumber, customerEmail , salesman ,actualPrice , discount , taxAmount , finalPrice, items
                  })
                  ,{headers})
                  .map( res => res.json())

  }


  getPDF(receiptNumber : number) {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',localStorage.getItem('auth_token'));
      return this.http.get('/receipt/'+receiptNumber, { responseType: ResponseContentType.Blob }).map(
        (res) => {
            return new Blob([res.blob()], { type: 'application/pdf' })

  })
  }


  getReceipts(page : number){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',localStorage.getItem('auth_token'));
    return this.http.get('/api/getReceipt/'+page, { headers})
                    .map(res => (res.json()));
  }

  receiptDetails(receiptID : number){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',localStorage.getItem('auth_token'))

    return this.http
                .get('/api/receiptDetails/'+receiptID, { headers})
                .map( res => res.json());
  }

  
}