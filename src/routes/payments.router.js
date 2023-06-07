import { Router } from "express";
import PaymentService from "../services/payments.service.js";

import Order from "../DAO/mongo/orders.mongo.js";

const router = Router()

const orderService = new Order();

router.post('/', async(req,res)=>{
    console.log("amount del orden", req.query.id)
    //const order = orderService.getOneByID(parseInt(req.query.id))
    const paymentIntentInfo = {
        amount: parseInt(req.query.id),
        currency:'usd'
    }
   
    const service = new PaymentService()
    const result = await service.createPaymentIntent(paymentIntentInfo)
   
        console.log("error")
     
    //console.log(result)
    res.send({status: 'success', payload: result})
})


export default router