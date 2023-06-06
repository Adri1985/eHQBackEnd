import User from '../DAO/mongo/users.mongo.js'

const userService = new User()

export const getUsers = async(req,res)=>{
    const result = await userService.get() 
    if (!result) return res.status(500).send({status:'error', error:'error getting users'})
    res.json({status:'succes', result:{result}})
}

export const getUserByID = async(req,res)=>{
    const {uid} = req.params

    const result = await userService.getOneByID(uid)
    if (!result) return res.status(500).send({status:'error', error:'error getting user'})
    
    res.json({status:"succes", result})
}

export const createUser = async(req,res)=>{
    const user = req.body
    const result = await userService.create(user)
    if (!result) return res.status(500).send({status:'error', error:'error creating user'})
    res.send({status:'succes', result:{result}})
}

export const updateUserPremium = async(req,res)=>{
    const {uid} = req.params
    const updData = req.body
    console.log("file", req.file)
    console.log("body", req.body)

    console.log("uid", uid)
    console.log("updData", updData)
    updData.avatar = req.file.path
    const result = await userService.updateUserPremium(uid,updData)
    console.log("upd data", updData)
    if (!result) return res.status(500).send({status:'error', error:'error updating user'})
    res.send(result)
    
}

export const deleteInactiveUsers = async(req,res)=>{
    console.log(req.file,req.body,16)
    const {minutes} = req.params
    console.log("minutes", minutes)
    const result = await userService.deleteInactiveUsers(minutes)
    console.log("result", result)
    if (!result) return res.status(500).send({status:'error', error:'error updating user'})
    res.send(result)

    

}

