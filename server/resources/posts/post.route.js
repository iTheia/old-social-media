import express from 'express'
import { body } from 'express-validator'
import { authorization, catchErrors } from '../../middlewares'
import controller from './post.controller'

const postRouter = express.Router()

postRouter.route('/')
    .get(catchErrors(controller.getAll))


export default postRouter