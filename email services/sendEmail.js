const nodemailer = require('nodemailer');
const { getEmailAndPassword } = require('../utils/emailPrompt');

async function sendEmail() {
  const { email, password } = await getEmailAndPassword();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password
    }
  });

  const mailOptions = {
    from: email,
    to: 'recipient-email@example.com',
    subject: 'React Native Code',
    text: 'Please find the React Native code attached below:',
    html: `<pre>${ReportUser.toString()}</pre>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

sendEmail();