var model = require('../model/user');
var Validator = require('../utilities/validator');

var orderservice = {}

orderservice.viewcustomer = (customerId)=>{
    return model.customerDetails(customerId).then((customer)=>{
        if(customer == null){
            let err = new Error("Customer Details not found");
            err.status = 404;
            throw err;
        }
        else{
            return customer
        }
    })
}


orderservice.customerdetails = (customerId) => {
    Validator.validateCustomer(customerId);
    return orderservice.viewcustomer(customerId).then((data) => {
        if (data.orders.length > 0) {
            return data.orders
        } else {
            let err = new Error("No Order Details found")
            err.status = 404
            throw err;
        }
    })
}


orderservice.calculateAmount = (bookObj)=>{
    var items={
        MexicanWave:250,
        CheddarCheesy:200,
        FarmHouse:220,
        PaneerHandi:230
    }
    var pizzao = bookObj.pizzaName; 
    var quant = bookObj.quantity;          
    cst = 0;
    for(var i=0;i<pizzao.length;i++){
            var x = items[pizzao[i]]
            var y = quant[i]
            cst = x*y+cst
    }
        bookObj.amount=cst;
}

orderservice.order = (customerId,orderr)=>{
    Validator.validateCustomer(customerId);
    Validator.validateDate(orderr.delieveryDate);
    Validator.availability(orderr);
    return orderservice.viewcustomer(customerId).then((order)=>{
        orderservice.calculateAmount(orderr);
        Validator.delievery(orderr.amount);
        return model.bookPizza(customerId,orderr).then((order)=>{
            if(order){return order}
            else{
            let err = new Error("Failed to update data");
              err.status=500;
              throw err;
            }
        });
    })
}




module.exports = orderservice;
