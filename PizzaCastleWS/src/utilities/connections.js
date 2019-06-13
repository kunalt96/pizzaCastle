const {Schema } = require("mongoose");
var Mongoose = require("mongoose");
Mongoose.Promise = global.Promise;
var url = "mongodb://localhost:27017/PizzaBookinDB";


var PizzaBookingSchema = Schema({
    name: String,
    customerId:Number,
    contactNumber: Number,
    address: String,
    orders:[{
            orderId:Number,
            delieveryDate: Date,
            amount:Number,
            pizzaName:Array,
            quantity:Array
    }]
},{collection:"PizzaOrder"});

var collection = {}

collection.getCollection=()=>{
        return Mongoose.connect(url,{useNewUrlParser:true}).then((databse)=>{
                return databse.model('PizzaOrder',PizzaBookingSchema)
        }).catch((error)=>{
                let err= new Error("Could not connect to Database");
        err.status = 500;
        throw err;
        })
}

module.exports = collection;
 



