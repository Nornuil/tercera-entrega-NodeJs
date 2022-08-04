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

module.exports = {
  isAuthenticated,
  isNotAuthenticated,
  isProductDataValid,
  isProductPropertyEmpty,
};
