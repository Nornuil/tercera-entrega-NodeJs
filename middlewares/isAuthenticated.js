const productSchema = require("../models/productos");
const mongoose = require("mongoose");

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json({ msg: "Necesita loguearse para acceder" }).status(401);
}

function isNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json({ msg: "Ya estaba deslogueado" }).status(201);
}

function isProductDataValid(req, res, next) {
  if (
    req.body.nombre &&
    req.body.descripcion &&
    req.body.precio &&
    req.body.stock &&
    req.body.imagenURL
  ) {
    return next();
  }
  res
    .json({ msg: "El objeto tiene campos invalidos o incompletos" })
    .status(400);
}

function isProductPropertyEmpty(req, res, next) {
  if (
    req.body.nombre != "" &&
    req.body.descripcion != "" &&
    req.body.precio != "" &&
    req.body.stock != "" &&
    req.body.imagenURL != ""
  ) {
    return next();
  }
  res
    .json({ msg: "El objeto tiene campos invalidos o incompletos" })
    .status(400);
}

async function isIdProductValid(req, res, next) {
  const result = await productSchema.find({
    _id: mongoose.Types.ObjectId(req.body.idProducto),
  });
  if (result.length > 0) {
    return next();
  }
  res.json({ msg: "El producto no existe" }).status(400);
}

module.exports = {
  isAuthenticated,
  isNotAuthenticated,
  isProductDataValid,
  isProductPropertyEmpty,
  isIdProductValid,
};
