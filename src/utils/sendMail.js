import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
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
    from: `"AI Visibility Agency" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `🚀 New ${service} Order - ${packageName}`,

    html: `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2>🚀 New Order Received</h2>

        <hr>

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

        <hr>

        <h3>Project Details</h3>

        <p>${message}</p>

      </div>
    `,
  });
};

export default sendMail;
