import passport from 'passport';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import { configureJWTStrategy } from './passport-jwt';
//import logger from 'morgan';

export const setGlobalMiddleware = app => {
    configureJWTStrategy();
    app.use(express.json());
    app.use(cors());
    app.use(passport.initialize());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));


}