import express from 'express';
import { userRouter } from './resourses/user';

export const restRouter = express.Router();

restRouter.use('/users',userRouter);