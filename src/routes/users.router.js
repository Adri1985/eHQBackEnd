import {Router} from 'express'

import multer from 'multer'



import {getUsers, getUserByID, createUser, updateUserPremium,deleteInactiveUsers} from '../controllers/users.controller.js'

const upload = multer({dest: './src/public/images'})

const router = Router()

router.get('/', getUsers)

router.get('/:uid', getUserByID)

router.post('/', createUser)

router.post('/:uid', upload.single('avatar'),updateUserPremium)

router.post('/deleteInactiveUsers/:minutes', deleteInactiveUsers )

export default router