const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const countryRoutes = require("./routes/countryRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2500;

// Set CORS options to allow access from any origin
const corsOptions = {
  origin: '*', // Allow access from any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these methods
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", countryRoutes);

// Add a simple route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Adex; Country and Dial Code API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
