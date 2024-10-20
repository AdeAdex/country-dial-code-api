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
  res.status(200).json({
    message: "Welcome to the Adex Country and Dial Code API. This API provides comprehensive data on countries and their corresponding dial codes, enabling seamless integration for applications requiring geographical and telecommunication information.",
    documentation: "For detailed API documentation and usage guidelines, please refer to the official documentation.",
    availableEndpoints: [
      {
        method: "GET",
        path: "/api/countries",
        description: "Fetch a complete list of countries."
      },
      {
        method: "GET",
        path: "/api/dial_code",
        description: "Retrieve detailed information about a specific country dial code, based on the provided country code (e.g., 'US' for the United States)."
      }
    ],
    support: "For any inquiries or technical support, please contact our team at adeoluamole@gmail.com"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
