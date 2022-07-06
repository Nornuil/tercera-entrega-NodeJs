const express = require("express");
const authRouter = express.Router();
const passport = require("../passport/local-auth");

const {
  //   failLoginController,
  //   successLoginController,
  failRegisterController,
  successRegisterController,
  registroController,
  //   loginController,
  logoutController,
} = require("../controllers/authController");

// const authRouter = new Router();

// // registro
authRouter.post(
  "/registro",
  passport.authenticate("registro", {
    successRedirect: "/auth/successRegister",
    failureRedirect: "/auth/failRegister",
  })
);
authRouter.post("/register", registroController);
authRouter.get("/failRegister", failRegisterController);
authRouter.get("/successRegister", successRegisterController);

// // login
// authRouter.post("/login", loginController);
// authRouter.get("/failLogin", failLoginController);
// authRouter.get("/successLogin", successLoginController);

// logout
// authRouter.get("/logout", logoutController);
authRouter.get("/logout", logoutController);

module.exports = authRouter;
