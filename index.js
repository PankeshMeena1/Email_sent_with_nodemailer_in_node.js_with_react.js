const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors")
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', async (req, res) => {
  const { name, complaint, contact, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pankeshmeena977@gmail.com', // Replace with your email
      pass: 'vhkc dcpi uvrv gmnx', // Replace with your password or use an app password
    },
    tls: {
        rejectUnauthorized: false
      }
  });

  const mailOptions = {
    from: `${email}`, // Replace with your email
    to: 'pankeshmeena977@gmail.com', // Replace with the email where you want to receive complaints
    subject: 'New Complaint',
    text: `
      Name: ${name}
      Complaint: ${complaint}
      Contact: ${contact}
      Email: ${email}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error sending email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
});
