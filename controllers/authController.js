const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyOtp = async (req, res) => {
  const { phone, name, email } = req.body;

  if (!phone || !name) {
    return res.status(400).json({ message: "Phone and name are required" });
  }

  let user = await User.findOne({ phone });

  if (!user) {
    user = await User.create({ phone, name, email });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(200).json({
    token,
    user,
  });
};

module.exports = {
  verifyOtp,
};
