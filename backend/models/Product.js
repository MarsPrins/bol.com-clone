const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    priceDecimal: { type: Number, required: true },
    desc: { type: String, required: true },
    category: { type: String, required: true },

    // next time use a category list on the backend
    // to get the cat image and then you can only
    // use categories that are in that list
    categoryImg: {
      type: String,
      default:
        "https://s.s-bol.com/nl/upload/images/visual-categories/7934.jpg",
    },
    thumbnail: { type: String, required: true },
    images: { type: Array, required: true },
    reviewsAmnt: { type: Number, default: 0 },
    starRating: { type: Number, default: 0 },
    brand: { type: String },
    onSale: {
      type: Object,
      newPrice: { type: Number },
      newPriceDecimal: { type: Number },
      percent: { type: Number },
    },
    stock: { type: Number },
    deliveryTime: { type: Number, required: true },
    sizes: { type: Array },
    multi: { type: Array },
    extraInfo: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

// maak een product en vraag client side voor de current grote en kleur en ook de andere veries
// van de groottes en kleuren ( eg. current color = black & other colors = white, grey)
// baseer producten pagina op titel niet id voor makkelijke verandering van grootte etc
// zorg ervoor dat

////// deze hieronder

// regel de sizes client side en stuur door naar verkoper zodat ze weten welke opgestuurd moet worden
// (betekent dat andere grootte geen extra geld kan kosten)
// als je specefiek wil dat een andere kleur of ander soort van het product zijn eigen pagina heeft (ook dus eige prijs)
// dan maak je de product pagina aan van x soort product
// en gebruik je de postman voorbeeld met kleuren etc, stuur je de user naar een pagina met productId
