// // routes/orderRoutes.js
// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");
// const Order = require("../models/Order");
// const sendOrderEmail = require("../utils/sendEmail"); // ✅ Import the email utility

// // POST /api/orders (Protected route)
// router.post("/", authMiddleware, async (req, res) => {
//   const { cartItems, totalAmount, tip, discount, address, slot, paymentMethod } = req.body;

//   if (!cartItems || !address || !slot || !paymentMethod) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     const newOrder = await Order.create({
//       userId: req.user.id,
//       cartItems,
//       totalAmount,
//       tip,
//       discount,
//       address,
//       slot,
//       paymentMethod,
//     });

//     // ✅ Send confirmation email
//     await sendOrderEmail(req.user.email, newOrder);

//     res.status(201).json(newOrder);
//   } catch (err) {
//     console.error("Order creation error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router(); // ✅ You missed this line

const authMiddleware = require("../middleware/authMiddleware");
const Order = require("../models/Order");
const User = require("../models/User");
const sendOrderEmail = require("../utils/sendEmail");

router.post("/", authMiddleware, async (req, res) => {
  const { cartItems, totalAmount, tip, discount, address, slot, paymentMethod } = req.body;

  if (!cartItems || !address || !slot || !paymentMethod) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // ✅ Fetch user
    const user = await User.findById(req.user.id);
    if (!user || !user.email) {
      return res.status(400).json({ message: "User email not found" });
    }

    // ✅ Create order
    const newOrder = await Order.create({
      userId: req.user.id,
      cartItems,
      totalAmount,
      tip,
      discount,
      address,
      slot,
      paymentMethod,
    });

    // ✅ Send confirmation email
    await sendOrderEmail(user.email, newOrder);

    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
