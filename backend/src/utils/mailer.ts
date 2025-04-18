import nodemailer from "nodemailer";
import { Transporter } from "nodemailer";
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
if (!emailUser || !emailPass) {
  throw new Error('EMAIL_USER and EMAIL_PASS must be set in project root .env file');
}

let transporter: Transporter;

transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: emailUser,
        pass: emailPass,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.log("Email transporter error:", error);
    } else {
        console.log("Email transporter is ready");
    }
});

export default transporter;
