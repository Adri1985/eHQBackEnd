import Store from '../DAO/mongo/stores.mongo.js'

const storeService = new Store()

export const getStores = async()=>{
    
    const result = await storeService.get()
    if (!result) return ({status:'error', error:'error getting stores'})
    return({products:result[0].products})
}

export const getStoreProducts = async()=>{
    
    const result = await storeService.get()
    const storeProducts = result[0] // hard coded, luego hacerlo pinamico por store ID
    const products =[]
    for (let i=0;i<storeProducts.products.length; i++){
        
        storeProducts.products[i].product.stock = storeProducts.products[i].quantity
        
        products.push(storeProducts.products[i].product)

    }
    return(products)
}

export const getStoreByID = async(sid)=>{
 
    const result = await storeService.getOneByID(sid)
    if (!result) return ({status:'error', error:'error getting store'})
    
    return({status:'succes', result:{result}})
}

export const createStore = async(store)=>{
    
    const result = await storeService.create(store)
    if (!result) return ({status:'error', error:'error creating store'})
    return({status:'succes', result:{}})
}

export const addProduct = async(sid, productParam)=>{
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
    return({status:'succes', result:{}})
}

