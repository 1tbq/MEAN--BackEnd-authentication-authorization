import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import config from '../../config';
import User from '../resourses/user/user.model'
export const configuerGoogleStrategy = () => {
    passport.use(new GoogleStrategy.Strategy({
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL
    },
        async function (accessToken, refreshToken, profile, done) {
            try {
                const user = await User.findOne({ 'google.id': profile.id });
                if (user) {
                    return done(null, user);
                }
                const newUser = new User({});
                newUser.google.id = profile.id;
                newUser.google.token = accessToken;
                newUser.google.displayName = profile.displayName;
                newUser.google.email = profile.emails[0].value;
                await newUser.save();
                done(null, newUser);
            } catch (error) {
                console.error(error);
                return done(error)
            }
            console.log('accessToken: ', accessToken);
            console.log('refreshToken: ', refreshToken);
            console.log('profile: ', profile);
            cb(null, profile);
        }
    ));
}

