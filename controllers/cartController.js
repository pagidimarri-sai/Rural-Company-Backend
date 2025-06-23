const Cart = require("../models/Cart");

exports.saveCartItems = async (req, res) => {
  const userId = req.user.id;
  const { items } = req.body;

  try {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { items },
      { upsert: true, new: true }
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to save cart" });
  }
};
