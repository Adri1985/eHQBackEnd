import Store from '../DAO/mongo/stores.mongo.js'

const storeService = new Store()

export const getStores = async(req,res)=>{
    
    const result = await storeService.get()
    if (!result) return res.status(500).send({status:'error', error:'error getting stores'})
    res.json({products:result[0].products})
}

export const getStoreProducts = async(req,res)=>{
    console.log("entra")
    const result = await storeService.get()
    const storeProducts = result[0]
    const products =[]
    for (let i=0;i<storeProducts.products.length; i++){
        console.log("storeProduct",storeProducts.products[i])
        storeProducts.products[i].product.stock = storeProducts.products[i].quantity
        console.log(storeProducts.products[i].quantity)
        products.push(storeProducts.products[i].product)

    }
    res.json({products, user: req.user})
}

export const getStoreByID = async(req,res)=>{
    const {sid} = req.params

    const result = await storeService.getOneByID(sid)
    if (!result) return res.status(500).send({status:'error', error:'error getting store'})
    
    res.json({status:'succes', result:{result}})
}

export const createStore = async(req,res)=>{
    const store = req.body
    const result = await storeService.create(store)
    if (!result) return res.status(500).send({status:'error', error:'error creating store'})
    res.send({status:'succes', result:{}})
}

export const addProduct = async(req,res)=>{
    const productParam = req.params.pid

    
    const {sid} = req.params
    let found = 0
    const store = await storeService.getOneByID(sid)
    

    for (let i = 0; i< store.products.length; i++){
        
        if(store.products[i].product == productParam){
            store.products[i].quantity += 1
            found = 1
        }
    } 
    
    if (found == 0) store.products.push({product:productParam, quantity:1 })
    const result = await storeService.updateStore(sid, store)
    res.send({status:'succes', result:{}})
}

