import express from 'express'
import { body } from 'express-validator'
import { authorization, catchErrors } from '../../middlewares'
import controller from './post.controller'

const postRouter = express.Router()

postRouter.route('/')
    .get(catchErrors(controller.getAll))
    .post(authorization, [
        body('description').trim().escape()
    ], catchErrors(controller.create))


export default postRouter