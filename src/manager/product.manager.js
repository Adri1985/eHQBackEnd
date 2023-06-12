
import {ProductService} from '../repository/index.js'

import CartService from '../repository/carts.repository.js'

import Order from "../DAO/mongo/orders.mongo.js";

import OrderService from "../DAO/mongo/orders.mongo.js"

import User from '../DAO/mongo/users.mongo.js'

import Cart from '../DAO/mongo/carts.mongo.js'

const cartService = new Cart()

const userService = new User()

const orderService = new Order();

import querystring from 'querystring'

import {transport} from '../utils.js'


class ProductManager{
    constructor()
    {

    }
    setProducts =(products)=>{
        this.products = products
    }
        // constructor por parametros
    addProduct = async( product) =>{
        const result = await ProductService.create(product)
        return (result)
    }   
    // constructor por objeto Product
    validateProduct = (product) =>{
        
        const {id, marca, modelo, tipo, rango, topFeature1, topFeature2, topFeature3, imageName, liked, stock, onCart} = product
        //return (id&& marca&& modelo&& tipo&& rango&& topFeature1&& topFeature2&& topFeature3&& imageName&& liked&& stock&& onCart)
        return true
    }

    createOne = async( product) =>{   // DEJO LAS VALIDACIONES QUE EXISTIAN
        if(this.validateProduct(product)){
            const result = await ProductService.createOne(product)
            return result
        }
        else{
            
            return({})
        }
    }  
    s
  
    deleteOne= async(pid) =>{
        //antes de borrar, verificar ordenes y carritos y notificar usuarios
        //borrar de los carts
        //this.findProductAndDeleteFromCarts(pid)
        const orders = await this.findOrdersWithProduct(pid)
        const usersToNotify = await this.findUsersWithOrders(orders)
        
        await this.sendEmailToUsers(usersToNotify,pid)
        

        //const result = await ProductService.deleteOne(pid)
        const result =[]
        return (result)
    }   

    getAll = async(query) =>{
        const {limit, page, orden, filter}= query
        const options = {limit:10,page: 1, lean:true, sort:{price:1}}
        const filterObj = JSON.parse(JSON.stringify(querystring.parse(query.filter))) 
        const productsPaginated = await ProductService.getPaginate(filterObj, options )
        return(productsPaginated.docs)
        
    }
    getOne = async(id) => {
        const result = await ProductService.getOne(id)
        return result
    }
    updateOne = async(id, updProduct)=>{
        return ProductService.updateOne(id, updProduct)
    }

   

    findOrdersWithProduct= async(productID) =>{
        const orders = await orderService.get()
        const ordersUpdated = []
        
        
        for (const order of orders){
            if(order.products.find(el=> el._id == productID )){
                const newProducts = order.products.filter(el=> el._id != productID)
                order.products = newProducts
                //await OrderService.updateOne({_id:order.id}, order)
                ordersUpdated.push(order._id)
                break

            }
        }
        return ordersUpdated
    }

    findUsersWithOrders = async(orders) =>{
        const users = await userService.get()
        //
        const usersToNotify =[]
        for ( let i = 0; i< users.length; i++){
            for (let j = 0; j< orders.length; j++){
                
                
                if(users[i].orders.find(el => el = orders[j])){
                    usersToNotify.push(users[i])
                }
            }
        }
        return usersToNotify
    }

    sendEmailToUsers = async(users, pid)=>{
        for(let i = 0; i<users.length; i++){
            
            await this.sendmail(users[i], pid)
    }

    }
    

    sendmail = async (user,pid) => {
        
        const result = await transport.sendMail({
          from:'electrichqargentina@gmail.com',
          to:user.email,
          subject: `One product from your order has been removed from stock`,
          html:`<div>
            <h1> Dear ${user.first_name} <h1>
            <h2> We regret to inform that product id ${pid} has been removed from stock
           <p> Your current orders might have been affected</p>
           <p> We appologies the inconvinience. Regards</p>
           <p> E-HQ Crew</p>
          </div>`
        })
    };




}
export default ProductManager

