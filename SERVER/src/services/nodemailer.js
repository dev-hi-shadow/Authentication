const ejs = require("ejs");
const path = require("path");
const nodemailer = require("nodemailer");

exports.sendEmail = async (
  template_name = "",
  params = {},
  subject = "",
  from = "",
  attachments = [],
  ...rest
) => {
  try {
    const YEAR = new Date().getFullYear();
    const html = await ejs.renderFile(
      path.join(__dirname, "..", "templates", template_name),
      {
        ...params,
        LANDING_PAGE_URL: process.env.LANDING_PAGE_URL,
        FRONT_END_APP_URL: process.env.FRONT_END_APP_URL,
        YEAR,
      }
    );

    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP_HOST,
      port: process.env.EMAIL_SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    console.log('params.user_data.email', params.user_data.email)

    const mailOption = {
      from: from || process.env.SMTP_EMAIL,
      to: params.user_data?.email,
      subject: subject,
      html,
      attachments: attachments,
    };
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log("sendEmail Error:", error);
    throw new Error(error);
  }
};
