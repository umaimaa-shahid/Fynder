// utils/sendEmail.js
import nodemailer from "nodemailer";

const sendEmail = async (to, link) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Verify Your Fynder Account",
    html: `<p>Click below to verify:</p><a href="${link}">${link}</a>`,
  });
};

export default sendEmail;