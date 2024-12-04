const nodeMailer = require('nodemailer');
const mailConfig = require('../config/mail.config'); 
require('dotenv/config'); 

exports.sendMail = async ({ to, subject, htmlContent }) => {
    try {
        const transporter = nodeMailer.createTransport({
            host: mailConfig.HOST,
            port: mailConfig.PORT,
            secure: false, // Không sử dụng SSL (nếu dùng thì set `secure: true`)
            auth: {
                user: mailConfig.USERNAME,
                pass: mailConfig.PASSWORD,
            },
        });

        const options = {
            from: mailConfig.FROM_ADDRESS,
            to: to,
            subject: subject,
            html: htmlContent,
        };

        const info = await transporter.sendMail(options);
        console.log("Email sent: ", info.messageId);
    } catch (err) {
        console.error("Error sending email:", err.message);
        throw new Error("Failed to send email");
    }
}