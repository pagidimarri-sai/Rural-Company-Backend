const Order = require("../models/orderModel");

const createOrder = async (req, res) => {
  try {
    const { cartItems, totalAmount, tip, discount, slot, paymentMethod, address } = req.body;

    const order = await Order.create({
      userId: req.user._id,
      cartItems,
      totalAmount,
      tip,
      discount,
      address,
      slot,
      paymentMethod,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Create order failed", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createOrder,
};
