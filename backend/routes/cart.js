const Cart = require("../models/Cart");
const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// CREATE

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    return res.status(200).json(savedCart);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE QUANTITY
// router.put("/:id/:productId", verifyTokenAndAuth, async (req, res) => {
//   console.log(req.body.quantity);
//   try {
//     const query = { "products.productId": req.params.productId };
//     const updateDocument = {
//       $set: { "products.$.quantity": req.body.quantity },
//     };
//     const result = await Cart.findOneAndUpdate(
//       { userId: req.params.id },
//       { query },
//       { updateDocument }
//     );
//     console.log(result);
//     return res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// DELETE

router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER CART

router.get("/find/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
