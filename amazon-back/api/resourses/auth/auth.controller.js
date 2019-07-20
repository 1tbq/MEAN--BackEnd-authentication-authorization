import jwt from 'jsonwebtoken';
import config from '../../../config'
export default {
    sendJWTToken(req, res) {
        const token = jwt.sign({ id: req.user.id }, config.secret, { expiresIn: '1d' });
        res.redirect(`${config.frontendURL}/shop/?token=${token}`);
    },
    authenticate(req, res) {
        return res.send(true);
    },
    logout(req, res) {
        req.logout(); // remove the session and remove req.user;
        return res.json({ success: true });
    },
}