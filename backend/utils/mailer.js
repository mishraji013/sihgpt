// backend/utils/mailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: EMAIL_USER, pass: EMAIL_APP_PASSWORD }
});

export async function sendOtpEmail(toEmail, otp) {
  const mailOptions = {
    from: EMAIL_USER,
    to: toEmail,
    subject: "Your OTP for EduPlatform",
    html: `<p>Your verification code is <b>${otp}</b>. It will expire in ${process.env.OTP_EXPIRATION_MINUTES || 10} minutes.</p>`
  };
  return transporter.sendMail(mailOptions);
}
