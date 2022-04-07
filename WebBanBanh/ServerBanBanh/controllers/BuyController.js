const { json } = require('body-parser')
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AeWJHCS9-QyHSk5R_Inbsn_C4rzQ3pmHMOfUxthzi-kZVvBnSzmtPu9DI3RJRNO6mJaaz4yefkpjzhOq',
    'client_secret': 'ECULAJp72aKsxThW3cTozFGp3Y_eJYQMcH3xFfU1VCn5oMyd3B09T5hmCF05Buan57SandUmAWxnoW3f'
  });

var total=0;
var items ;
class BuyController{



    


   index(req,res) {

        

        
    //var items = await req.body.items

    var Item = req.body.items
    items = JSON.parse(Item)

    items.map((item)=>{
        total+= (parseFloat(item.price) * item.quantity)
    })


    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/buy/success",
            "cancel_url": "http://localhost:3000/buy/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": items
            },
            "amount": {
                "currency": "USD",
                "total": total.toString()
            },   
        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                
                    res.json(payment.links[i].href);
                
                    
                }
            }

        }
    });

    
   }

   success(req,res){
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": total.toString()


            }
        }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function(error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            const order = new Order({

                ma: items.ma,
                ten: items.ten,
                userName: { type: String, index: true},
                soLuong: { type: Number, default: 0 },
                tongGia :{ type: Number, default: 0 },
            
              });
            res.send('Success (Mua hàng thành công)</br> <a href="http://localhost:3001/">quay ve trang chu </a>')
        }
    });
   }
   cancel(req,res){
    res.send('Cancelled (Đơn hàng đã hủy) </br> <a href="http://localhost:3001/">quay ve trang chu</a>')
    }


   
}

module.exports = new BuyController