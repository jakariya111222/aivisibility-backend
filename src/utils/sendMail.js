import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

const sendMail = async (data) => {
  console.log("SMTP_HOST:", process.env.SMTP_HOST);
  console.log("SMTP_PORT:", process.env.SMTP_PORT);
  console.log("SMTP_USER:", process.env.SMTP_USER);
  console.log("SMTP_PASS exists:", !!process.env.SMTP_PASS);

  try {
    console.log("Verifying SMTP...");
    await transporter.verify();
    console.log("SMTP VERIFIED ✅");

    const info = await transporter.sendMail({
      from: `"AI Visibility Agency" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      replyTo: data.email,
      subject: "Test",
      html: "<h1>Test</h1>",
    });

    console.log("MAIL SENT:", info);
  } catch (err) {
    console.error("SMTP ERROR:", err);
    throw err;
  }
};
export default sendMail;
