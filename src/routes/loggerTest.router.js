import { Router } from 'express'

import { addLogger } from '../utils/logger.js'


const router = Router()

router.use(addLogger)

router.get('/', (req,res)=>{
    try{
        
        req.logger.fatal('Advertencia !!')
        req.logger.warning('Warninng')
        req.logger.info('Info')
        req.logger.debug('debug')
        res.send({"result":"Logger tested"})
    }
    catch(e){
        
    }

})
   


export default router