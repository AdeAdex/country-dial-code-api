const axios = require('axios');
const nodemailer = require('nodemailer');
require('dotenv').config();

// console.log("GAMEHUB_URL:", process.env.GAMEHUB_URL);

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const apiKeyRequests = new Map();

// Function to send email notification
// const sendNotification = async (apiKey, name) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_USER, // Replace with the email you want to notify
//     subject: 'API Key Access Notification',
//     text: `A request was made with the following:\nAPI key: ${apiKey}\nName: ${name}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Notification sent successfully');
//   } catch (error) {
//     console.error('Error sending notification:', error.message);
//   }
// };

const checkApiKey = async (req, res, next) => {
  const apiKey = req.headers.authorization?.split(" ")[1];

  // Log the API key
//   console.log("Received API key:", apiKey);

  if (!apiKey) {
    return res.status(401).json({ message: "API key is missing" });
  }

  try {
    const response = await axios.post(`${process.env.GAMEHUB_URL}/api/verify-apikey`, { apiKey });

    if (response.data.valid) {
      const name = response.data.name;
      const requestCount = response.data.requestCount;

      // Check if this API key has already been notified
      if (!apiKeyRequests.has(apiKey)) {
        apiKeyRequests.set(apiKey, { count: 1 });

        // Send notification email
        // await sendNotification(apiKey, name);
      } else {
        const apiKeyData = apiKeyRequests.get(apiKey);
        apiKeyData.count += 1;
        apiKeyRequests.set(apiKey, apiKeyData);

        // Optionally log the count
        console.log(`API key ${apiKey} has been used ${apiKeyData.count} times`);
      }

      next();
    } else {
      res.status(403).json({ message: "Invalid API key" });
    }
  } catch (error) {
    console.error("Error verifying API key:", error.message);
    res.status(500).json({ message: "Failed to verify API key at country-dial-code api" });
  }
};

module.exports = checkApiKey;
