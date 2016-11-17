import { Router, Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { secret } from "../config";
var passport	  = require('passport');
var jwt         = require('jwt-simple');
var bCrypto     = require('bcrypt-nodejs');
var config      = require('../config/database'); // get db config file
var User        = require('../models/user'); // get the mongoose model
var Inventory   = require('../models/inventory');
var Product     = require('../models/product');
var Supplier    = require('../models/supplier');
var Receipt     = require('../models/receipt');
var nodemailer  = require('nodemailer');
var PDFDocument = require('pdfkit');
var fs          = require('fs');
var async       = require('async');

const protectedRouter: Router = Router();


 var createHash = function(password){
        return bCrypto.hashSync(password, bCrypto.genSaltSync(10), null);
    };

// route to a restricted info (GET http://localhost:8080/api/memberinfo)
protectedRouter.post('/addEmployee', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
          //user logged in
            if (!req.body.username || !req.body.password) {
              res.json({success: false, msg: 'Please pass name and password.'});
            } else {
              var newUser = new User({
                name : req.body.username,
                password : createHash(req.body.password),
                firstName : req.body.firstname,
                secondName : req.body.secondname,
                address : req.body.address,
                mobileNumber : req.body.mobileNumber,
                dob : req.body.dob,
                joiningDate : req.body.joiningDate,
                adminAccess : req.body.adminRights
              });
              // save the user
              newUser.save(function(err) {
                if (err) {
                  return res.json({success: false,user_exists : true , msg: 'Username already exists.'});
                }
                return res.json({success: true, msg: 'Successful created new user.'});
              });
            }
         
        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});



// route to a restricted info (GET http://localhost:8080/api/memberinfo)
protectedRouter.get('/listEmployees', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
            // user has logged in so return all the employees added
             User.find(function(err,users){
              if(err){
                return res.send(500,err);
              } else {
                return res.json(users)
              }
          })
         
        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});


// route to a restricted info (GET http://localhost:8080/api/memberinfo)
protectedRouter.get('/profile/:empid', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
            // user has logged in so return all the employees added
            console.log(req.params.empid)
            User.findById(req.params.empid, function(err, user){
              if(err) {
                return res.json(err);
              }
              return res.json(user);
            })
         
        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

protectedRouter.get('/listSuppliers', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
            // user has logged in so return all the employees added
             Supplier.find(function(err,supplier){
              if(err){
                return res.send(500,err);
              } else {
                return res.json(supplier)
              }
          })
         
        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});





// route to a restricted info (GET http://localhost:8080/api/memberinfo)
protectedRouter.get('/supplier_profile/:supid', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
            // user has logged in so return all the employees added
            console.log(req.params.supid)
            Supplier.findById(req.params.supid, function(err, user){
              if(err) {
                return res.json(err);
              }
              return res.json(user);
            })
         
        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});




// route to a restricted info (GET http://localhost:8080/api/memberinfo)
protectedRouter.post('/addSupplier', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
          //user logged in
              var newSupplier = new Supplier({
                supplierName : req.body.supplierName,
                location : req.body.location,
                mobileNumber : req.body.mobileNumber,
                address : req.body.address,
                bank_details : req.body.bank_details
               
              });
              // save the user
              newSupplier.save(function(err) {
                if (err) {
                  console.log(err);
                  return res.json({success: false,supplier_exists : true , msg: 'Supplier already exists.'});
                }
                return res.json({success: true, msg: 'Successful added new supplier.'});
              });
            
         
        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});



// route to a restricted info (GET http://localhost:8080/api/memberinfo)
protectedRouter.post('/addInventory', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
          //user logged in
              var emp_id = user._id;
              console.log("employee who added is "+emp_id);
             var newInventory = new Inventory({
               supplier_id : req.body.supplier_id,
               product_id :req.body.product_id,
               product_sku :req.body.product_sku,
               quantityOrdered : req.body.quantity,
               quantityLeft : req.body.quantity,
               purchaseCost : req.body.cp,
               sellingPrice : req.body.sp,
               minSellingPrice : req.body.msp,
               employeeid : emp_id
             });
            newInventory.save(function(err){
              if(err){
                console.log(err);
                return res.json({success: false, msg: "item already exists"});
              }
              return res.json({success: true, msg: "item added!!"});
            })
        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});


protectedRouter.put('/editInventory/:inventoryID', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
            // user has logged in so return all the employees added
           Inventory.findById(req.params.inventoryID)
                    .exec(function(err,inventory){
                       if(err){
                            return res.send(500,err);
                        } else {
                            inventory.purchaseCost    = req.body.itemCost;
                            inventory.sellingPrice    = req.body.sellingPrice;
                            inventory.minSellingPrice = req.body.minSellingPrice;
                            inventory.save(function (err) {
                                if(err) {
                                    console.error('ERROR!');
                                } else {
                                  res.send({success: true})
                                }
                            });
                        } 
                    })
           
        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});


protectedRouter.get('/inventoruList', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
            // user has logged in so return all the employees added

            Inventory.find({'quantityLeft' : {$gt:0}})
                      .populate('product_id')
                      //.select('product_id')
                      .exec(function(err,inventory){
                        if(err){
                            return res.send(500,err);
                        } else {
                          console.log(inventory);
                            return res.json(inventory)
                        }
                      })
        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});


protectedRouter.get('/transactionDetail/:transactionid', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
            // user has logged in so return all the employees added
            console.log(req.params.productid)
            Inventory.findById(req.params.transactionid)
                    .populate('product_id')
                    .populate('supplier_id')
                    .exec(function(err,inventory){
                      if(err){
                        return res.send(500,err);
                      }
                      console.log(inventory);
                      return res.json(inventory);
                    })
         
        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});




protectedRouter.get('/supplierTransactions/:supid', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
            // user has logged in so return all the employees added
              Inventory.find({'supplier_id':req.params.supid})
                        .populate('product_id')
                        .exec(function(err,inventory){
                        if(err){
                          return res.send(500,err);
                        } else {
                          console.log(inventory);
                          return res.json(inventory)
                        }
            })
        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

// route to a restricted info (GET http://localhost:8080/api/memberinfo)
protectedRouter.post('/addProduct', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
          //user logged in
              var emp_id = user._id;
              console.log("employee who added is "+emp_id);
             var newProduct = new Product({
                name        : req.body.name,
                description : req.body.description,
                sku         : req.body.sku,
                employeeid  : emp_id
             });
            newProduct.save(function(err){
              if(err){
                console.log(err);
                return res.json({success: false, msg: "Product already exists"});
              }
              return res.json({success: true, msg: "Product added!!"});
            })
        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});


protectedRouter.get('/productList', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
            // user has logged in so return all the employees added
             Product.find(function(err,inventory){
              if(err){
                return res.send(500,err);
              } else {
                return res.json(inventory)
              }
          })
         
        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});



protectedRouter.get('/product_profile/:productid', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
            // user has logged in so return all the employees added
            console.log(req.params.productid)
            Product.findById(req.params.productid, function(err, product){
              if(err) {
                console.log("item not found")
                return res.json(err);
              }
              console.log(product);
              return res.json(product);
            })
         
        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});


protectedRouter.get('/productTransaction/:productid', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
            // user has logged in so return all the employees added
            console.log(req.params.productid)
            Inventory.find({'product_id': req.params.productid})
                    .populate('product_id')
                    .populate('supplier_id')
                    .exec(function(err,inventory){
                      if(err){
                        return res.send(500,err);
                      }
                      console.log(inventory);
                      return res.json(inventory);
                    })
         
        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});






// route to a restricted info (GET http://localhost:8080/api/memberinfo)
protectedRouter.post('/createReceipt', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
            var validQuantity =true;
            //user logged in
            var emp_id = user._id;
            console.log("employee who added is "+emp_id);
           
            var newReceipt = new Receipt({ 
              customerName    : req.body.customerName,
              customerAddress : req.body.customerAddress,
              customerNumber  : req.body.customerNumber,
              customerEmail   : req.body.customerEmail,
              biller          : emp_id,
              salesman        : req.body.salesman,
              actualPrice     : req.body.actualPrice,
              discount        : req.body.discount,
              taxAmount       : req.body.taxAmount,
              finalPrice      : req.body.finalPrice,
              items           : []
            });
             
            for(let item of req.body.items) {
              
              let itemObj = {
                inv_Id          : item['selecteditemSKU'], 
                itemName        : item['itemName'], 
                itemCost        : item['itemCost'], 
                itemQuantity    : item['itemQuantity'], 
                itemDiscount    : item['itemDiscount'], 
                itemTotalPrice  : item['itemTotalPrice'] 
              };
              newReceipt.items.push(itemObj);
            }


            var calls = []            
            req.body.items.forEach(function(item){
              calls.push(function(callback){
              Inventory.findById(item.selecteditemSKU)
                                  .populate('product_id')
                                  .populate('supplier_id')
                                  .exec(function(err,inventory){
                                    if(err){
                                       return callback("err");
                                    }
                                    if(item.itemQuantity > inventory.quantityLeft) {
                                      validQuantity = false;
                                      return callback(item.selecteditemSKU);
                                    }
                                    callback(null, item);
                                  })
              })
            });

            async.parallel(calls, function(err, result) {
                /* this code will run after all calls finished the job or
                  when any of the calls passes an error */
                if (err)
                    return res.json({success: false, msg: "Item "+err+" ordered is more than what is available in inventory"});
                if (validQuantity == true) {

                req.body.items.forEach(function(item){
                      Inventory.findById(item.selecteditemSKU,function(err,inventory){
                        if(err) {
                          return res.send(500);
                        } else {
                          inventory.quantityLeft = inventory.quantityLeft - item.itemQuantity;
                          inventory.save(function(err,updateInventory) {
                            if(err) {
                              return res.send(500);
                            }  else {
                              console.log(item.selecteditemSKU+" item updated in database")
                            }
                          })
                        }
                      })
                    });

                   

                  console.log("inside save");
                  newReceipt.save(function(err){
                    if(err){
                      console.log(err);
                      return res.json({success: false, msg: err});
                    }
                     let invoice = new PDFDocument({autoFirstPage: false});
                    invoice.pipe(fs.createWriteStream('./server/Receipts/'+newReceipt._id+'.pdf'));
                    invoice.addPage({
                        layout: 'landscape'
                    });


                    invoice.lineWidth(25)
                    //# line cap settings
                    invoice.lineCap('butt')
                    .moveTo(150, 20)
                    .lineTo(650, 20)
                    .stroke()

                    invoice.fontSize(18)
                    .fillColor('white')
                    .text('I N V O I C E', 350, 15)


                    invoice.fontSize(30)
                        .font('Times-Roman')
                        .fillColor('black')
                        .text('Universal Stores',50, 50)
                   
                    invoice.fontSize(12)
                    	  .font('Courier')
                        .text('TTC Industrial Area,')
                    invoice.text('Thane-Belapur Road,')
                    invoice.text('Airoli,')
                    invoice.text('Navi-Mumbai')
                    invoice.text('Pin-400708')

                   

                    invoice.lineWidth(1)
                    invoice.fontSize(15)
                        .font('Courier')
                        .fillColor('black')
                        .text('Invoice#',525,60)
                    invoice.moveDown()
                    invoice.text('Date')
                    invoice.moveDown()
                    invoice.text('Amount')
                    
                    invoice.rect(520, 50, invoice.y-55,invoice.y-45 ).stroke()

                    invoice.font('Courier')
                      .text(newReceipt._id,invoice.x+90,60)
                    invoice.moveDown()
                    let today  = new Date();
                    let day    = today.getDate();
                    let month  = today.getMonth();
                    let year   = today.getFullYear();
                    invoice.font('Courier')
                      .text(day+'/'+month+'/'+year);
                    invoice.moveDown()
                    invoice.font('Courier')
                      .text("Rs "+newReceipt.finalPrice)

                    invoice.rect(605, 50, invoice.y,invoice.y-45 ).stroke()

                  
                    invoice.moveTo(520, 83)
                        .lineTo(745, 83) 
                        .stroke() 
                    invoice.moveTo(520, 116)
                        .lineTo(745, 116) 
                        .stroke() ;

                    


                    //invoice.fontSize(16).fillColor('#cccccc').text("How are you How are you How are you How are you How are you How are you How are yo How are you How are you How are you ",50, 250, {
                    //  width: 20
                    //})
                        
                    invoice.moveDown(2);
                    invoice.font('Helvetica')
                            .text("Customer Name  :  "+newReceipt.customerName,50)
                    invoice.font('Helvetica')
                            .text("Mobile Number    :  "+newReceipt.customerNumber,50)
                    
                   // # Using a standard PDF font
                   
                    let x=160; 
                    let y_axis =250;
                    invoice.font('Helvetica')
                      .text('#',50,y_axis)
                      .text('Item Name',x-40,y_axis)
                      .text('Unit Price',x+150,y_axis)
                      .text('Quantity',x+260,y_axis)
                      .text('Discount',x+360,y_axis)
                      .text('Price',x+480,y_axis)
                      
                    invoice.moveTo(50, y_axis+25)
                        .lineTo(745, y_axis+25)
                        .dash(5, {space: 10}) 
                        .stroke() 

                    invoice.moveDown(1)
                    invoice.font('Courier')
                    let serialNumber=0;
                    x=50;
                    let y=y_axis+40;
                    for(let item of newReceipt.items){
                      serialNumber++;
                      
                      invoice.text(serialNumber,x,y);
                      invoice.text(item.itemCost,x+260,y,{width:100});
                      invoice.text(item.itemQuantity,x+380,y,{width:80});
                      invoice.text(item.itemDiscount+'%',x+480,y,{width:100});
                      invoice.text(item.itemTotalPrice,x+580,y,{width:220});
                      invoice.text(item.itemName,x+30,y,{width:180});
                      
                      y=invoice.y+10;
                     
                    }
                    invoice.moveTo(50, y)
                        .lineTo(745, y)
                        .dash(5, {space: 10}) 
                        .stroke()

                    invoice.font('Helvetica')
                            .text('Total:',x+535,y+10)
                    invoice.font('Courier') 
                            .text(newReceipt.finalPrice,x+580,y+10)

                    
                    invoice.end();
                    return res.json({success: true, msg: "Invoice Generated!!",receipt: newReceipt});
                  })
                } 
            }); 
        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});



protectedRouter.get('/getReceipt', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
            // user has logged in so return all the employees added
            var pageNum = 1;
            if(req.query.pageNumber) {
              console.log("page length is "+req.query.pageNumber);
              pageNum = req.query.pageNumber;
            }
           
           Receipt.find(function(err,receipt){
             if(err){
              return res.send(500,err);
              } else {
                const count   = receipt.length
                const perPage = 10;
                const start   = (pageNum - 1) * perPage;
                const end     = start + perPage;
                receipt       = receipt.slice(start, end);
                //console.log("get receipt called" +receipt);
                return res.json({"item" : receipt , "total" : count});
             }
           })
         
        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

protectedRouter.get('/receiptDetails/:receiptId', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
            // user has logged in so return all the employees added
           Receipt.findById(req.params.receiptId)
                  .exec(function(err,receipt){
                    if(err){
                      return res.send(500,"error occured");
                    } else {
                      return res.json(receipt);
                    }
                  })
         
        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});










protectedRouter.post("/send",function(req,res){
  var transporter = nodemailer.createTransport({
    host : 'smtp.mailgun.org',
    port : 465,
    secure : true,
    auth : {
      user : 'postmaster@sandboxd181c8838f02408cabafb91eeaff6f61.mailgun.org',
      pass: 'd4f70872d78bb89d7df73e6185fec1d8'
    }
  });
  var mailOption = {
    from: 'Kiran Shenoy<Kiran@blabla.com>',
    to:'kiranshenoy@yahoo.com',
    subject: 'test mail',
    text:'test from node mailer',
    html:'<h1> im loving it</h1>'
  };

  transporter.sendMail(mailOption, function(err,info){
    if(err) {
      console.log(err);
      res.send(err);
    }
    else {
      console.log("mail sent");
      res.send("sent");
    }
  })
})





protectedRouter.get('/createPDF', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {

          //invalid token authentation failed
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});

        } else {
          //user logged in
            var doc = new PDFDocument;
            doc.pipe(fs.createWriteStream('./server/Receipts/output.pdf'));
            doc.font('Times-Roman')
               .fontSize(42)
               .text('my second pdf asd asd asd asc asd asd asd asdgenerated',100,100);
               console.log(__dirname);
            doc.end();

            var path='../server/output.pdf';

            
            fs.readFile(path, function(err,data){
              res.contentType("application/pdf");
              res.send(data);
            })
            


        }
    });
  } else {
    //no user login found
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});










 
var getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export { protectedRouter }





