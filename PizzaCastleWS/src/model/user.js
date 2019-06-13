var collection = require('../utilities/connections');
var bookingDb = {}

bookingDb.generateId = () => {
    return collection.getCollection().then(function (collection) {
        return collection.distinct("orders.orderId").then((orderId) => {
            var max_order_Id = Math.max(...orderId);
            if (max_order_Id > 0)
                return max_order_Id+ 1;
            else
                return 101
        })
    })
}

bookingDb.customerDetails = (customerId) =>{
    return collection.getCollection().then((collection)=>{
        return collection.findOne({customerId: customerId}).then((customerdata)=>{
            if(customerdata){return customerdata}
            else{ return null}
        })
    })
}


bookingDb.bookPizza = (customerId,bookObj)=>{
    return bookingDb.generateId().then((orderId)=>{
        bookObj.orderId = orderId;
        return collection.getCollection().then((order)=>{
            return order.updateOne({customerId: customerId},
                {
                    $push:{orders:bookObj}
                }
                ).then((saved)=>{
                    if (saved.nModified == 1)
                    return bookObj
                else
                    return null
                })
        })
    })
}

module.exports = bookingDb;

