import express from 'express';
const router = express.Router();
import {getUser, userLogin, registerUser } from '../controllers/userController'
import { validate, loginSchema, userSchema } from '../validation/schema';
import protect from '../middleware/authMiddleware'


router.post('/register', validate(userSchema), registerUser)
router.post('/login',validate(loginSchema), userLogin)
router.get('/me', protect, getUser)



export default router 