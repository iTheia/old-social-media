import express from 'express'
import path from 'path'
import { body } from 'express-validator'
import multer from 'multer'
import { authorization, catchErrors } from '../../middlewares'
import controller from './user.controller'
import { v4 as uuid} from 'uuid'

const userRouter = express.Router()

const storage = multer.diskStorage({
    filename: (req, file, cb) =>{
        cb(null, uuid() + path.extname(file.originalname).toLowerCase())
    },
    destination:(req, file, cb) =>{
        cb(null, path.join(__dirname, '../../../client/public/images'))
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) =>{
        console.log(file, req)
        const fileTypes = /jpeg|jpg|png/;
        const mimetype = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))
        if(mimetype && extname){
            return cb(null, true)
        }
        cb('file is not valid')
    }
})

userRouter.route('/')
    .get(authorization,  catchErrors(controller.getDshboard))
    .put(authorization,[ 
        body('email').trim().escape(),
        body('password').trim().escape(),
        body('name').trim().escape()
    ],upload.single('image'),catchErrors(controller.update))

userRouter.get('/getParam/follows', authorization, catchErrors(controller.getFollows))
userRouter.get('/edit', authorization, catchErrors(controller.getEditable))

userRouter.route('/:id')
    .get(catchErrors(controller.getSingle))
    .delete(authorization, catchErrors(controller.delete))


export default userRouter