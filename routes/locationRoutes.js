const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const { protect } = require('../middleware/authMiddleware'); // ✅ FIXED
const authMiddleware = require("../middleware/authMiddleware");


router.post("/", authMiddleware, async (req, res) => {  const { coordinates, address, label } = req.body;

  if (!coordinates || !address) {
    return res.status(400).json({ message: 'Coordinates and address are required' });
  }

  const location = await Location.create({
    userId: req.user.id,
    coordinates,
    address,
    label,
  });

  res.status(201).json(location);
});

module.exports = router;
