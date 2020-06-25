import express from 'express'
import { body } from 'express-validator'
import { catchErrors } from './middlewares'
import { userRoute, userController } from './api/users'
import { postRoute } from './api/posts'

const router = express.Router()

router.post('/signIn', [ 
        body('email').trim().escape(),
        body('password').trim().escape(),
        body('name').trim().escape()
], catchErrors(userController.signIn))

router.post('/signUp', [
    body('email').trim().escape(),
    body('password').trim().escape()
], catchErrors(userController.create))

router.use('/users', userRoute)
router.use('/posts', postRoute)

export default router