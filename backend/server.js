const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connection Succesfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/checkout", stripeRoute);

app.listen(process.env.PORT || 3001, () => {
  console.log("backend is working on port 3001");
});

mongoose.disconnect();
