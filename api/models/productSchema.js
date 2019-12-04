const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type:Number, required:true },
  productImage: {type: String, required: true}
});

module.exports = mongoose.model("ProductSchema", productSchema);


//  id: mongoose.Schema.Types.ObjectId,