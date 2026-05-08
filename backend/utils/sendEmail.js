import nodemailer from "nodemailer";

const sendEmail = async (to, link) => {
  try {
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

      html: `
        <h2>Email Verification</h2>
        <p>Click below to verify your account:</p>
        <a href="${link}">${link}</a>
      `,
    });

    console.log("Email sent");

  } catch (err) {
    console.log("Email error:", err.message);
  }
};

export default sendEmail;