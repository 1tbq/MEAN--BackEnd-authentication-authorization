import express from 'express';
import passport from 'passport';
import authController from './auth.controller';

export const authRouter = express.Router();

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
authRouter.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    },
    )
);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back configuerGoogleStrategyto the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
authRouter.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/failure' }),
    authController.sendJWTToken
);


//Twitter routes
authRouter.get(
    '/twitter',
    passport.authenticate('twitter', {
        scope: ['profile', 'email'],
    },
    )
);
authRouter.get(
    '/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/failure' }),
    authController.sendJWTToken
);


//github routes
authRouter.get('/github',
    passport.authenticate('github', {
        scope: ['user:email']
    }));

authRouter.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/failure' }),
    authController.sendJWTToken
);

authRouter.get('/authenticate', passport.authenticate('jwt', { session: false }), authController.authenticate);
//authRouter.get('/logout', authController.logout);
authRouter.get('/logout', passport.authenticate('jwt', { session: false }), authController.logout);