const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderId: mongoose.Schema.Types.ObjectId,
  productbind: { type: mongoose.Schema.Types.ObjectId, ref: "ProductSchema", required:true },
  quantity: { type: Number, default: 1 },
})

module.exports = mongoose.model("OrderSchema", orderSchema);