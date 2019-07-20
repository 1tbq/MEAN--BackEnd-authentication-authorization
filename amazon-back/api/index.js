import express from 'express';
import { userRouter } from './resourses/user';
import { authRouter } from './resourses/auth';

export const restRouter = express.Router();

restRouter.use('/users', userRouter);
restRouter.use('/auth', authRouter);