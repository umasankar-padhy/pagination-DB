
const express = require("express");
const { getApiData, getApiCount } = require("../controllers/getApiData");

const router = express.Router();

// Define routes for user authentication and authorization

router.post("/getApiData", getApiData);
router.get("/getApiCount", getApiCount);



module.exports = router;
