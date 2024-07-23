// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const countryRoutes = require("./routes/countryRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2500;

app.use(cors());
app.use(express.json());

app.use("/api", countryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
