const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

console.log("Email Service Loaded");

// reusable HTML template
const emailTemplate = (title, content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: #4f46e5;
      color: #ffffff;
      padding: 16px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    .content {
      padding: 24px;
      color: #333333;
      font-size: 15px;
      line-height: 1.6;
    }
    .content p {
      margin: 0 0 12px;
    }
    .footer {
      background: #f9fafb;
      text-align: center;
      padding: 12px;
      font-size: 12px;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">${title}</div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} Your App. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

const EmailService = async (email, subject_text, message) => {
  const mailoption = {
    from: `"Your App Team" <${process.env.GOOGLE_APP_EMAIL}>`,
    to: email,
    subject: subject_text,
    text: message.replace(/<[^>]*>?/gm, ""), // fallback text
    html: emailTemplate(subject_text, message),
  };

  try {
    const info = await transporter.sendMail(mailoption);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.log("Failed to send mail:", error.message);
  }
};

module.exports = EmailService;
