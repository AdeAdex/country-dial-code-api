// routes/countryRoutes.js
const express = require("express");
const checkApiKey = require("../middlewares/checkApiKey");
const { allCountryAPI, allCountryDialingCode } = require("../controllers/countryController");

const router = express.Router();

router.get("/countries", checkApiKey, allCountryAPI);
router.get("/dial_code", checkApiKey, allCountryDialingCode);

module.exports = router;
