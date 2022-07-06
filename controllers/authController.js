const passport = require("passport");

const registroController = async (req, res = response) => {
  passport.authenticate("registro", {
    failureRedirect: "/auth/failRegister",
    successRedirect: "/auth/successRegister",
  });
};

// module.exports = loginController = passport.authenticate("login", {
//   failureRedirect: "/auth/failLogin",
//   successRedirect: "/auth/successLogin",
// });

const successRegisterController = async (req, res = response) => {
  res.json({ msg: "ok" });
};

const failRegisterController = async (req, res = response) => {
  res.status(400).json({ err: "fallo el registro" });
};

// module.exports = function successLoginController(req, res) {
//   res.json({ msg: "ok" });
// };

// module.exports = function failLoginController(req, res) {
//   res.status(400).json({ err: "fallo el login" });
// };

const logoutController = async (req, res = response) => {
  if (req.isAuthenticated()) {
    req.logout();
  }
  res.sendStatus(200);
};

module.exports = {
  registroController,
  logoutController,
  successRegisterController,
  failRegisterController,
};
