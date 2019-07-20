import passport from 'passport';
//import TwitterStrategy from 'passport-twitter-oauth20';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import config from '../../config';
import User from '../resourses/user/user.model'

export const configuerTwitterStrategy = () => {
    passport.use(new TwitterStrategy({
        consumerKey: config.twitter.consumerKey,
        consumerSecret: config.twitter.consumerSecret,
        callbackURL: config.twitter.callbackURL
    },
        async function (token, tokenSecret, profile, done) {
            try {
                const user = await User.findOne({ 'twitter.id': profile.id });
                console.log(profile);
                if (user) {
                    return done(null, user);
                }
                const newUser = new User({});
                newUser.twitter.id = profile.id;
                newUser.twitter.token = token;
                newUser.twitter.displayName = profile.displayName;
                newUser.twitter.userName = profile.username;
                await newUser.save();
                done(null, newUser);
            } catch (error) {
                console.error(error);
                return done(error)
            }
            done(null, profile);
        }
    ));
}

