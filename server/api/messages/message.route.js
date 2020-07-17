import express from 'express'
import { body, check } from 'express-validator'
import { authorization, catchErrors } from '../../middlewares'
import controller from './message.controller'

const meessageRouter = express.Router()

meessageRouter.route('/')
    .get(authorization,  catchErrors(controller.getAll))
    .post(authorization, catchErrors(controller.create))

meessageRouter.route('/:id')
    .get(catchErrors(controller.getSingle))

meessageRouter.route('/:room_id/message')
    .post(authorization,[
        check('content', 'message content cannot be empty').not().isEmpty(),
        body('content').trim().escape()
    ], catchErrors(controller.sendMessage))
    .get(authorization, catchErrors(controller.getMessages))

export default meessageRouter