import nodemailer from 'nodemailer';
import htmlToText from 'html-to-text';
import config from '../../../config';

export const sendEmail = options => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: config.ethereal.host,
            port: config.ethereal.port,
            auth: {
                user: config.ethereal.username,
                pass: config.ethereal.password
            },
        });
        const text = htmlToText.fromString(options.html, {
            wordwrap: 130,
        });
        const mailOptions = {
            from: '"Tariq Bashir 👻" <noreply@tariqbashir.com>',
            to: options.email,
            subject: options.subject,
            text,
            html: options.html
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(error);
            }
            console.log("Message Id is ", info.messageId);
            console.log('Preview URL', nodemailer.getTestMessageUrl(info));
            return resolve({ message: 'Reset Email has been sent to your inbox' });
        });
    });
}