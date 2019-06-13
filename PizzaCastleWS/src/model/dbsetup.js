var today = new Date();
var year = today.getFullYear();
var month = today.getMonth();
var day = today.getDate();


collectionDocument = [
    {
        "name": 'John',
        "customerId": 20001,
        "contactNumber":9639639633,
        "address": "DownTown",
        "orders":[{
            "orderId":101,
            "delieveryDate": new Date(year,month,day+2),
            "amount":200,
            "pizzaName":["MexicanWave"],
            "quantity":[2]
        },
        {
            "orderId":102,
            "delieveryDate": new Date(year,month,day+1),
            "amount":400,
            "pizzaName":["MexicanWave","PaneerHandi"],
            "quantity":[2,1]
            

        }
    ]
},{
    "name": 'Suzzane',
        "customerId": 20002,
        "contactNumber":7894561232,
        "address": "Sector 56",
        "orders":[{
            "orderId":103,
            "delieveryDate": new Date(year,month,day+1),
            "amount":200,
            "pizzaName":["MexicanWave","FarmHouse"],
            "quantity":[2,1]
        },
        {
            "orderId":104,
            "delieveryDate": new Date(year,month,day+2),
            "amount":400,
            "pizzaName":["MexicanWave","CheddarCheesy"],
            "quantity":[2,1]

        }
    ]

}
]




var collection = require('../utilities/connections');

exports.setupDb = ()=>{
    return collection.getCollection().then((mycollection)=>{
        return mycollection.deleteMany().then((data)=>{
            return mycollection.insertMany(collectionDocument).then((data)=>{
                if(data){return "Insertion Done"}
                else{throw new Error("Insertion failed")}
            })
            
        })
    })
}