// middlewares/checkApiKey.js
const axios = require('axios');
require('dotenv').config();

const checkApiKey = async (req, res, next) => {
  const apiKey = req.headers.authorization?.split(" ")[1];

  if (!apiKey) {
    return res.status(401).json({ message: "API key is missing" });
  }

  try {
    const response = await axios.post(`${process.env.GAMEHUB_URL}/api/verify-apikey/route.js`, { apiKey });

    if (response.data.valid) {
      next();
    } else {
      res.status(403).json({ message: "Invalid API key" });
    }
  } catch (error) {
    console.error("Error verifying API key:", error.message);
    res.status(500).json({ message: "Failed to verify API key" });
  }
};

module.exports = checkApiKey;
