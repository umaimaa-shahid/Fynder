import { Resend } from "resend";

const sendEmail = async (to, link) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!process.env.RESEND_API_KEY) {
      console.log("Missing RESEND_API_KEY");
      return;
    }

    await resend.emails.send({
      from: "Fynder <onboarding@resend.dev>",
      to,
      subject: "Verify Your Fynder Account",
      html: `
        <h2>Welcome to Fynder</h2>
        <p>Click below to verify your account:</p>
        <a href="${link}">${link}</a>
      `,
    });
  } catch (error) {
    console.log("Email error:", error);
  }
};

export default sendEmail;