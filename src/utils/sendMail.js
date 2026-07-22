import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // Port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async ({
  name,
  company,
  email,
  phone,
  website,
  country,
  service,
  packageName,
  meetingDate,
  meetingTime,
  message,
}) => {
  const today = new Date().toLocaleString();

  await transporter.sendMail({
    from: `"AI Visibility Agency" <${process.env.MAIL_FROM}>`,
    to: process.env.MAIL_TO,
    replyTo: email,
    subject: `🚀 New ${service} Order - ${packageName}`,
    html: `
      <h2>New Order Received</h2>

      <p><strong>Date:</strong> ${today}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company || "-"}</p>
      <p><strong>Website:</strong> ${website || "-"}</p>
      <p><strong>Country:</strong> ${country || "-"}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Package:</strong> ${packageName}</p>
      <p><strong>Meeting Date:</strong> ${meetingDate || "-"}</p>
      <p><strong>Meeting Time:</strong> ${meetingTime || "-"}</p>

      <hr />

      <p>${message || "-"}</p>
    `,
  });
};

export default sendMail;
