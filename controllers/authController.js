const passport = require("passport");

// module.exports = loginController = passport.authenticate("login", {
//   failureRedirect: "/auth/failLogin",
//   successRedirect: "/auth/successLogin",
// });

const successRegisterController = async (req, res) => {
  res.status(201).json({ msg: "Usuario Registrado exitosamente" });
};

const failRegisterController = async (req, res) => {
  try {
    res.status(403).json({ error: "Usuario ya existe" });
  } catch (error) {
    res.status(404).json(error);
  }
};

const successLoginController = async (req, res = response) => {
  res.json({ msg: "Logueo exitoso" });
};

const failLoginController = async (req, res = response) => {
  res.status(401).json({ error: "Error de credenciales" });
};

const logoutController = async (req, res = response) => {
  if (req.isAuthenticated()) {
    req.logout();
  }
  res.status(200).json({ msg: "Logout exitoso" });
};

module.exports = {
  failLoginController,
  successLoginController,
  logoutController,
  successRegisterController,
  failRegisterController,
};
