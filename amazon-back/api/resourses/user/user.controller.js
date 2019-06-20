import userService from "./user.service";
const HttpStatus = require('http-status-codes');
import User from './user.model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../../config';

export default {
    async signup(req, res) {
        try {
            const { error, value } = userService.validateSchema(req.body);
            if (error && error.details) {
                return res.status(HttpStatus.BAD_REQUEST).json(error);
            }
            const user = await User.create(value);
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
            const user = await User.findOne({ email: value.email });
            if (!user) {
                return res.status(HttpStatus.BAD_REQUEST);
            }
            const matched = bcryptjs.compare(value.password, user.password);
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
    }
}