import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getUserData } from '../controllers/userController';
const userRouter = express.Router();
userRouter.get('/', protect, getUserData);
