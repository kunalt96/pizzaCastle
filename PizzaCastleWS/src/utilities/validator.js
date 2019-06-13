var Validator = {}

Validator.validateCustomer = (customerId) => {
    var custId = new String(customerId);
    var pattern = /^2[0-9]{4}$/;
    if (!custId.match(pattern)) {
        let err = new Error("Invalid! CustomerId must start with 2 and should be a 5 digit number");
        err.status = 406;
        throw err;
    }
}



Validator.validateDate = (deliveryDate) => {
    var today = new Date();
    var rdate = new Date(deliveryDate);
    if (today > rdate) {
        let err = new Error("Date of delivery must be  today or greater than today")
        err.status = 406;
        throw err;
    }
}

Validator.availability = (ordObj)=>{
    var pizzaavailable = ["MexicanWave",'CheddarCheesy','FarmHouse','PaneerHandi']
    var pizzao = ordObj.pizzaName;
    var quant = ordObj.quantity;
    if(pizzao.length!=quant.length){
        let err = new Error("Please check the order again")
            err.status = 400
            throw err;
    }
    for(var i=0;i<pizzao.length;i++){
        if(!pizzaavailable.includes(pizzao[i])){
            let err = new Error("One or more pizza is currently unavailable")
            err.status = 400
            throw err;
        }
    }
}

Validator.delievery = (cost)=>{
    if(cost<300){
        let err = new Error("Delivery is available on amount above 250")
        err.status = 406;
        throw err;
    }
}




module.exports = Validator