const mongoose = require("mongoose");
const moment = require("moment");
const { Schema } = mongoose;

const productSchema = new Schema({
  nombre: { type: String, require: [true, "El nombre es obligatorio"] },
  fechaHora: {
    type: String,
    default: moment(new Date()).format("DD/MM/YYYY HH:MM:SS"),
  },
  descripcion: {
    type: String,
    require: [true, "La descripción es obligatoria"],
  },
  precio: { type: Number, require: [true, "El precio es obligatorio"] },
  imagenURL: { type: String, require: [true, "La imagenURL es obligatoria"] },
  stock: { type: Number, require: [true, "El stock es obligatorio"] },
});

module.exports = mongoose.model("product", productSchema);
