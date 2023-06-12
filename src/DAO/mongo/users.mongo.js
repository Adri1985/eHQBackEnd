import UserModel from "../mongo/models/user.model.js"
import CartModel from "../mongo/models/cart.model.js"
import StoreModel from "../mongo/models/cart.model.js"

export default class User {
    constructor() {}

    get = async() => {
        return await UserModel.find().lean().exec()
    }

    create = async(data) => {
        const cart = await CartModel.create({products:[]})
        data.cart = cart._id
        
        await UserModel.create(data)
        return true
    }

    getOneByID = async(id) => {
        return await UserModel.findById(id).lean().exec()
    }

    getOneByEmail = async(email) => {
        return await UserModel.findOne({ email }).lean().exec()
    }

    updateUser = async(id, updOrders)=>{
        
        
        const result = await UserModel.updateOne({_id: id}, {$set: {orders:updOrders}})
        
        return result

    }

    updateLastConnection = async(id)=>{
        const result = await UserModel.updateOne({_id: id}, {$set:{last_connection:Date.now}})
        
        return result
    }

    updateUserPremium = async(id, updData)=>{
        
        
        
        let premium = "N"
        const update = await UserModel.findOneAndUpdate({_id:id}, 
            {$set:{adress:updData.adress},
                phone:updData.phone,
                country:updData.country,
                avatar:updData.avatar}
            )
        const user = await UserModel.findById(id).lean().exec()
        user.adress && user.country && user.avatar && user.phone? premium ="Y": premium="N"// condition to become premium
        const result = await UserModel.findByIdAndUpdate({_id:id},{$set:{premium:"Y"}},{new:true}).exec()
        
        return result
  
    }

    deleteInactiveUsers = async(minutes)=>{
        
        const toBeDeleted = await UserModel.find({
            lastLogin: {
              $lt: new Date(Date.now() - minutes/1440 * 24 * 60 * 60 * 1000).toISOString() 
            }
          })
        let remove = await UserModel.deleteMany({
            lastLogin: {
              $lt: new Date(Date.now() - minutes/1440 * 24 * 60 * 60 * 1000).toISOString() 
            }
          });
        
    }

    
    
}