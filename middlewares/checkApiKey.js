// middlewares/checkApiKey.js
require('dotenv').config();

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers.authorization?.split(" ")[1];
  
  if (!apiKey) {
    return res.status(401).json({ message: "API key is missing" });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: "Invalid API key" });
  }

  next();
};

module.exports = checkApiKey;
