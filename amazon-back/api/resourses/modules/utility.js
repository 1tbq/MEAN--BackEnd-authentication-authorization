import jwt from 'jsonwebtoken';
import config from '../../../config';
import bcryptjs from 'bcryptjs';
export const getJWTToken = payload => {
    const token = jwt.sign(payload, config.secret, {
        expiresIn: '1d',
    });
    return token;
};

export const getEncryptedPassword = async (password) => {
    const salt = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(password, salt);
    return hash;
}