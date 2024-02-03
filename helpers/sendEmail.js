import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

const sendEmail = (message) => {
  return transport.sendMail(message);
};

export default sendEmail;
