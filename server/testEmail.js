require('dotenv').config();
const nodemailer = require('nodemailer');


console.log('Using email:', process.env.EMAIL_USER);
console.log('Using password:', process.env.EMAIL_PASS ? 'Password is set' : 'Password is not set');
// Email sending function from your emailService.js
async function sendEmailWithAttachment({ to, subject, body, attachments }) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS, // Your email password
            },
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: body,
            attachments: attachments,
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

// Function to test email sending
async function testEmail() {
    try {
        await sendEmailWithAttachment({
            to: 'jessenay26@gmail.com', // Replace with your test email address
            subject: 'Test Email',
            body: 'This is a test email to check if the email service works.',
            attachments: [] // No attachments for this test
        });
        console.log('Test email sent successfully.');
    } catch (error) {
        console.error('Test email failed:', error);
    }
}

// Run the test
testEmail();
