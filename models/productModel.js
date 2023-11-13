const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short product title"],
      maxlength: [100, "Too long product title"],
    },
    storeID: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Store",
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [5, "Too short product description"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      max: [200000, "Too long product price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],

    imageCover: {
      type: String,
      required: [true, "Product Image cover is required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must be belong to category"],
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
      // set: (val) => Math.round(val * 10) / 10, // 3.3333 * 10 => 33.333 => 33 => 3.3
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    used: [
      {
        exist: {
          type: Boolean,
          default: false,
        },
        Model: String,
        DateofUsed: Date,
        ZeroBroke: {
          type: Boolean,
          default: false,
        },
      },
    ],
    sell: {
      type: Number,
      required: true,
    },
    buy: {
      type: Number,
      require: true,
    },
    net_profit: {
      type: Number,
      default: 0,
    },
    parcode: {
      type: String,
    },
    SuppliersIDs: [
      {
        SupplierID: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Supplier",
        },
        role: {
          type: String,
          required: true,
          default: "Supplier",
        },
      },
    ],
    ingredients: [
      {
        type: ObjectId,
        ref: "Ingredients",
      },
    ],
    ISavailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    // to enable virtual populate
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.path("parcode").default(function () {
  return Math.random().toString(36).substring(7);
});

productSchema.pre("save", function (next) {
  if (this.sell && this.buy) {
    this.net_profit = this.sell - this.buy;
  }
  next();
});

productSchema.virtual("reviews", {
  ref: "Reviews",
  foreignField: "product",
  localField: "_id",
});

// Mongoose query middleware
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name -_id",
  });
  next();
});

const setImageURL = (doc) => {
  if (doc.imageCover) {
    const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imageUrl;
  }
  if (doc.images) {
    const imagesList = [];
    doc.images.forEach((image) => {
      const imageUrl = `${process.env.BASE_URL}/products/${image}`;
      imagesList.push(imageUrl);
    });
    doc.images = imagesList;
  }
};
// findOne, findAll and update
productSchema.post("init", (doc) => {
  setImageURL(doc);
});

// create
productSchema.post("save", (doc) => {
  setImageURL(doc);
});

module.exports = mongoose.model("Product", productSchema);
