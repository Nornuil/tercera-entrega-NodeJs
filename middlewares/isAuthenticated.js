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

module.exports = { isAuthenticated, isNotAuthenticated };
