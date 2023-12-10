const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// CREATE

router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    return res.status(200).json(savedProduct);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("product has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// get single product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all products
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCat = req.query.category;
  const qCatSale = req.query.categorySale;
  const qSale = req.query.sale;
  const limit = req.query.limit;
  const skip = req.query.skip;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(qNew);
    } else if (qCat) {
      products = await Product.find({
        category: qCat,
      });
    } else if (qCatSale) {
      products = await Product.find({
        category: qCatSale,
        onSale: { $gte: {} },
      });
    } else if (qSale) {
      products = await Product.find({ onSale: { $gte: {} } })
        .sort({ createdAt: -1 })
        .limit(qSale);
    } else if (limit && skip) {
      products = await Product.find().skip(skip).limit(limit);
    } else if (limit) {
      products = await Product.find().limit(limit);
    } else if (skip) {
      products = await Product.find().skip(skip);
    } else {
      products = await Product.find();
    }

    const allProductsLength = (await Product.find()).length - 1;

    products = {
      products,
      total: allProductsLength,
    };

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL CATEGORIES

router.get("/categories/", async (req, res) => {
  const qSale = req.query.sale && true;

  try {
    const categories = qSale
      ? await Product.find(
          { onSale: { $gte: {} } },
          { category: 1, categoryImg: 1 }
        )
      : await Product.find({}, { category: 1, categoryImg: 1 });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

// SEARCH
router.get("/search/:query", async (req, res) => {
  const query = req.params.query;
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);

  try {
    let result;

    if (!skip && !limit) {
      result = await Product.aggregate([
        {
          $search: {
            index: "searchProducts", // optional unless you named your index something other than "default"
            text: {
              query: query,
              path: "title",
              fuzzy: {},
            },
          },
        },
        {
          $project: {
            score: { $meta: "searchScore" },
            _id: 1,
          },
        },
      ]);
    } else if (limit && skip) {
      result = await Product.aggregate([
        {
          $search: {
            index: "searchProducts", // optional unless you named your index something other than "default"
            text: {
              query: query,
              path: "title",
              fuzzy: {},
            },
          },
        },

        {
          $project: {
            score: { $meta: "searchScore" },
            _id: 1,
          },
        },
        { $limit: limit + skip },
        { $skip: skip },
      ]);
    } else if (skip) {
      result = await Product.aggregate([
        {
          $search: {
            index: "searchProducts", // optional unless you named your index something other than "default"
            text: {
              query: query,
              path: "title",
              fuzzy: {},
            },
          },
        },

        {
          $project: {
            score: { $meta: "searchScore" },
            _id: 1,
          },
        },
        { $skip: skip },
      ]);
    } else if (limit) {
      result = await Product.aggregate([
        {
          $search: {
            index: "searchProducts", // optional unless you named your index something other than "default"
            text: {
              query: query,
              path: "title",
              fuzzy: {},
            },
          },
        },

        {
          $project: {
            score: { $meta: "searchScore" },
            _id: 1,
          },
        },
        { $limit: limit },
      ]);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

// AUTOCOMPLETE
router.get("/autocomplete", async (req, res) => {
  const query = req.query.q;
  const limit = req.query.limit;

  try {
    let result =
      query &&
      (await Product.aggregate([
        {
          $search: {
            index: "productsAutocomplete", // optional unless you named your index something other than "default"
            autocomplete: {
              query: query,
              path: "title",
              tokenOrder: "sequential",
            },
          },
        },

        {
          $project: {
            _id: 0,
            title: 1,
            score: { $meta: "searchScore" },
          },
        },
      ]));

    if (limit) {
      result =
        query &&
        (
          await Product.aggregate([
            {
              $search: {
                index: "productsAutocomplete", // optional unless you named your index something other than "default"
                autocomplete: {
                  query: query,
                  path: "title",
                  tokenOrder: "sequential",
                },
              },
            },

            {
              $project: {
                _id: 0,
                title: 1,
                score: { $meta: "searchScore" },
              },
            },
          ])
        ).limit(limit);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
