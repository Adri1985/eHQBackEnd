import Stripe from "stripe"
const key = 'sk_test_51NCCXeHMI31FK1640ZXyJywxornoDEMo0hw2hP4sMlfgGweuOgQF3A13B90DAtXDDzbvDsUE3iv1PpCZYD8RsVRJ0066oTruSa'


export default class PaymentService {
    constructor(){
        this.stripe = new Stripe(key)
    }
    createPaymentIntent = async(data)=>{
        const paymentIntent = this.stripe.paymentIntents.create(data)
        return paymentIntent
    }
}
