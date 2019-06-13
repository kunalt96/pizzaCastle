class Booking {
    constructor(obj){
        this.orderId = obj.orderId;
        this.deliveryDate = obj.deliveryDate;
        this.amount = obj.amount;
        this.pizzaName = obj.pizzaName;
        this.quantity = obj.quantity;
    }
}
module.exports = Booking;