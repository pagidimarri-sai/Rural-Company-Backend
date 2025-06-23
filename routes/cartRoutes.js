const express = require("express");
const router = express.Router();
const { saveCartItems } = require("../controllers/cartController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, saveCartItems);
module.exports = router;
