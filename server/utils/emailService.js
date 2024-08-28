require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendEmailWithAttachment({ to, subject, body, attachments }) {
    console.log('Preparing to send email...');
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: body,
            attachments,
        };

        console.log('Sending email with the following options:', mailOptions);
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        console.log('Full info:', info);
    } catch (error) {
        console.error('Error sending email:', error.message);
        console.error('Full error:', error);
        throw error;
    }
}

module.exports = { sendEmailWithAttachment };
