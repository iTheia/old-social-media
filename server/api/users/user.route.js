import express from 'express'
import { body } from 'express-validator'
import { authorization, catchErrors } from '../../middlewares'
import controller from './user.controller'

const userRouter = express.Router()

userRouter.get('/', catchErrors(controller.getAll))

userRouter.route('/:id')
    .get(catchErrors(controller.getSingle))
    .put(authorization,[ 
        body('email').trim().escape(),
        body('password').trim().escape(),
        body('name').trim().escape()
    ],catchErrors(controller.update))
    .delete(authorization, catchErrors(controller.delete))


export default userRouter