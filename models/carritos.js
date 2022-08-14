const mongoose = require("mongoose");
const { Schema } = mongoose;

const carritoSchema = new Schema({
  productos: { type: [Object], default: [] },
});

module.exports = mongoose.model("carrito", carritoSchema);
