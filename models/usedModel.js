const mongoose = require("mongoose");

const usedSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Used required"],
      unique: [true, "Used must be unique"],
      minlength: [3, "TOO short Used name"],
      maxlenght: [32, "Too long Used name "],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/used/${doc.image}`;
    doc.image = imageUrl;
  }
};

categorySchema.post("init", (doc) => {
  setImageUrl(doc);
});
categorySchema.post("save", (doc) => {
  setImageUrl(doc);
});

//2-Create model
const UsedModel = mongoose.model("Used", usedSchema);

module.exports = UsedModel;
