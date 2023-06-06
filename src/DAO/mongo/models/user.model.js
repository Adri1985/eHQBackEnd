import moment from "moment";

import mongoose, { now } from "mongoose";

const userCollection = "users"

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    role: {type:String,
        default:"user"},
    premium: {
        type: String,
        default:'N'  
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
   // last_connection: Date,
    orders: [{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Orders'
    }
        
    ],
    cart: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'carts'
    },
    adress: String,
    phone: String,
    country: String,
    avatar: {type:String,
            default:"src/public/images/default.png"}
},{timestamps:true})

mongoose.set("strictQuery", false)
const UserModel = mongoose.model(userCollection, userSchema)

export default UserModel


