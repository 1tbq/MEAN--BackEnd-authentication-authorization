import passport from 'passport';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import { configureJWTStrategy } from './passport-jwt';
import { configuerGoogleStrategy } from './passport-google';
//import logger from 'morgan';
import config from '../../config';
import session from 'express-session';
import User from '../resourses/user/user.model';
import { configuerTwitterStrategy } from './passport-twitter';
import { configuerGithubStrategy } from './passport-github';
export const setGlobalMiddleware = app => {
    app.use(express.json());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(session({
        secret: config.secret,
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    configureJWTStrategy();
    configuerGoogleStrategy();
    configuerTwitterStrategy();
    configuerGithubStrategy();

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(null, user);
        })
    });

    app.get('/failure', (req, res) => {
        res.redirect('http://localhost:4200/login');
    })
}