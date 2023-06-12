import User from '../DAO/mongo/users.mongo.js'

import UserDTO from '../DAO/DTO/users.dto.js'


const userService = new User()


import {transport} from '../utils.js'


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

export const getUserDTO = async(req,res)=>{
    const {uid} = req.params

    const result = await userService.getOneByID(uid)
    if (!result) return res.status(500).send({status:'error', error:'error getting user'})
    
    const userDTO = new UserDTO(result)
    res.json({status:"succes", userDTO})
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
    
    

    
    
    updData.avatar = req.file.path
    const result = await userService.updateUserPremium(uid,updData)
    
    if (!result) return res.status(500).send({status:'error', error:'error updating user'})
    res.send(result)
    
}

export const deleteInactiveUsers = async(req,res)=>{
    
    const {minutes} = req.params
    
    const result = await userService.deleteInactiveUsers(minutes)
    
    if (!result) return res.status(500).send({status:'error', error:'error updating user'})
    res.send(result)

    

}



