import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import config from '../../config';
import User from '../resourses/user/user.model'

export const configuerGithubStrategy = () => {
    passport.use(new GithubStrategy({
        clientID: config.github.clientId,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.callbackURL
    },
        async function (token, tokenSecret, profile, done) {
            try {
                const user = await User.findOne({ 'github.id': profile.id });
                console.log(profile);
                if (user) {
                    return done(null, user);
                }
                const newUser = new User({});
                newUser.github.id = profile.id;
                newUser.github.token = token;
                newUser.github.displayName = profile.displayName;
                newUser.github.email = profile.email;
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

