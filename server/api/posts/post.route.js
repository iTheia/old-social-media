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

postRouter.route('/:id')
    .get(catchErrors(controller.getSingle))
    .put(authorization, [
        body('description').trim().escape()
    ], catchErrors(controller.update))
    .delete(authorization, catchErrors(controller.delete))


export default postRouter