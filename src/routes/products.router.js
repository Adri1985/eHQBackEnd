import { Router } from 'express'
import querystring from 'querystring'
import multer from 'multer'
import {getAll, getOne, updateOne, createOne, deleteOne} from '../controllers/product.controller.js'

import { validateRole } from '../utils.js'

const router = Router()

const upload = multer({dest: './src/public/images'})

router.get('/', getAll)
   
router.get('/:id',getOne)

//router.post('/',validateRole('admin'),upload.single('imageName'),createOne)
router.post('/',upload.single('imageName'),createOne)

router.put('/:id',validateRole('admin'),updateOne) 

//router.delete('/:id',validateRole('admin'),deleteOne)
router.delete('/:id',deleteOne)

export default router