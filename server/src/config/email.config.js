const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

console.log("✅ Email Service Loaded");


// Professional Premium Email Template
const emailTemplate = (title, content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
</head>

<body style="margin:0;padding:0;background-color:#f2f4f6;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" bgcolor="#f2f4f6" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff"
          style="
            margin:30px auto;
            border-radius:12px;
            overflow:hidden;
            box-shadow:0 4px 15px rgba(0,0,0,0.1);
          ">

          <!-- Header -->
          <tr>
            <td align="center"
              style="
                background:linear-gradient(90deg,#4f46e5,#6366f1);
                color:#ffffff;
                padding:20px;
                font-size:22px;
                font-weight:bold;
              ">
              ${title}
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="
              padding:30px;
              color:#333333;
              font-size:15px;
              line-height:1.7;
            ">
              ${content}
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td align="center" style="padding-bottom:30px;">
              <a href="#"
                style="
                  background:#4f46e5;
                  color:#ffffff;
                  padding:12px 24px;
                  text-decoration:none;
                  border-radius:6px;
                  font-weight:bold;
                  display:inline-block;
                ">
                Open InstaTV
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center"
              style="
                background:#f9fafb;
                padding:20px;
                font-size:12px;
                color:#888888;
              ">

              © ${new Date().getFullYear()} InstaTV. All rights reserved.
              <br><br>
              This is an automated email. Please do not reply.

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;


// Main Email Service Function
const EmailService = async (email, subject_text, message) => {

  const mailOptions = {
    from: `"InstaTV Team" <${process.env.GOOGLE_APP_EMAIL}>`,
    to: email,
    subject: subject_text,

    // fallback text version
    text: message.replace(/<[^>]*>?/gm, ""),

    // HTML version
    html: emailTemplate(subject_text, message),
  };

  try {

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully");
    console.log("Message ID:", info.messageId);

    return true;

  } catch (error) {

    console.error("❌ Email failed:", error.message);

    return false;
  
  }

};

module.exports = EmailService;
