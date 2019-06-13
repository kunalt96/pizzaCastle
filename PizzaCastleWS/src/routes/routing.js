var express = require('express');
var routing = express.Router();
var service = require('../service/user');
var Booking = require('../model/booking')



routing.get('/book/:customerId',(req,res,next)=>{
    var customerId = parseInt(req.params.customerId);
    service.customerdetails(customerId).then(function (orders) {
        res.status(200)
        res.json(orders)
    }).catch(function (err) {
        next(err)
    })
})


routing.put('/book/:customerId',(req,res,next)=>{
    var customerId = parseInt(req.params.customerId);
    var bookingObj = new Booking(req.body);
    service.order(customerId,bookingObj).then((order)=>{
        res.status(200);
        res.json({"message":"Order Succesfully placed with "+order.orderId+" amount to be paid Rs "+order.amount})
    }).catch((err)=>{
        next(err);
    })
})



module.exports = routing;