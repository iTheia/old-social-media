import express from 'express'
import { body } from 'express-validator'
import multer from 'multer'
import path from 'path'
import { v4 as uuid} from 'uuid'
import { authorization, catchErrors } from '../../middlewares'
import controller from './post.controller'
import { commentRoute } from '../comments';

const postRouter = express.Router()

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
        const fileTypes = /jpeg|jpg|png/;
        const mimetype = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))
        if(mimetype && extname){
            return cb(null, true)
        }
        cb('file is not valid')
    }
})

postRouter.get('/likes/:id', authorization, catchErrors(controller.like))

postRouter.use('/:post_id/comments', commentRoute)

postRouter.route('/')
    .get(catchErrors(controller.getAll))
    .post(authorization, [
        body('description').trim().escape(),
        body('image').trim().escape()
    ], upload.single('image') ,catchErrors(controller.create))

postRouter.route('/:id')
    .get(catchErrors(controller.getSingle))
    .put(authorization, [
        body('description').trim().escape()
    ], catchErrors(controller.update))
    .delete(authorization, catchErrors(controller.delete))


export default postRouter