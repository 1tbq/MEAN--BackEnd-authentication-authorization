import userService from "./user.service";
const HttpStatus = require('http-status-codes');
import User from './user.model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../../config';
import { getJWTToken, getEncryptedPassword } from "../modules/utility";
import { sendEmail } from "../modules/mail";

export default {
    async signup(req, res) {
        try {
            const { error, value } = userService.validateSchema(req.body);
            if (error && error.details) {
                return res.status(HttpStatus.BAD_REQUEST).json(error);
            }
            const exstingUser = await User.findOne({ 'local.email': value.email });
            if (exstingUser) {
                return res.status(HttpStatus.BAD_REQUEST).json({ error: 'you have already create an account with this email' });
            }
            const user = await new User({});
            user.local.email = value.email;
            const salt = await bcryptjs.genSalt();
            const hash = await bcryptjs.hash(value.password, salt);
            user.local.password = hash;
            user.save();

            return res.json({
                success: true,
                message: 'User Created Successfully',
            });

        } catch (error) {
            console.error(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }

    },
    async login(req, res) {
        try {
            const { error, value } = userService.validateSchema(req.body);
            if (error && error.details) {
                return res.status(HttpStatus.BAD_REQUEST).json(error);
            }
            const user = await User.findOne({ 'local.email': value.email });
            if (!user) {
                return res.status(HttpStatus.BAD_REQUEST);
            }
            const matched = bcryptjs.compare(value.password, user.local.password);
            if (!matched) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Invalid Credentials' });
            }
            const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: '1d' });
            return res.json({ success: true, token });
        } catch (error) {
            console.error(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    },
    async test(req, res) {
        return res.json(req.user);
    },
    async forgotPassword(req, res) {
        try {
            const { value, error } = userService.validateForgotPasswordSchema(req.body);
            if (error && error.details) {
                return res.status(HttpStatus.BAD_REQUEST).json(error);
            }
            const criteria = {
                $or: [
                    { 'google.email': value.email },
                    { 'github.email': value.email },
                    { 'twitter.email': value.email },
                    { 'local.email': value.email },
                ],
            };

            const user = await User.findOne(criteria);
            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({ error: 'Could not found user' });
            }
            const token = getJWTToken({ id: user._id });

            const resetLink = `
            <h4>Please click on the link to reset the password</h4>
            <a href="${config.frontendURL}/reset-password/${token}">Reset Password</a>`

            const sanitizedUser = userService.getUser(user);
            const results = await sendEmail({
                html: resetLink,
                subject: 'Forgot Password',
                email: sanitizedUser.email
            });
            return res.json(results);

        } catch (error) {
            console.error(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    },
    async resetPassword(req, res) {
        try {
            const { password } = req.body;
            if (!password) {
                return res.status(HttpStatus.BAD_REQUEST).json({ error: 'passowrd is required' });
            }
            const user = await User.findById(req.user._id);
            const sanitizedUser = userService.getUser(user);
            if (!user.local.email) {
                user.local.email = sanitizedUser.email;
                user.local.name = sanitizedUser.name;
            }
            const hash = await getEncryptedPassword(password);
            user.local.password = hash;
            await user.save();
            return res.json({ success: true });
        } catch (error) {
            console.error(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    },
}