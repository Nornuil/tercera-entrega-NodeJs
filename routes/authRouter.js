const express = require("express");
const authRouter = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/authController");

const {
  failLoginController,
  // successLoginController,
  failRegisterController,
  //   loginController,
  logoutController,
} = require("../controllers/authController");

authRouter.post(
  "/registro",
  passport.authenticate("local-signup", {
    failureRedirect: "error/failRegister",
  }),
  authController.successRegisterController
);
authRouter.get("/error/failRegister", failRegisterController);

// // login
authRouter.post(
  "/login",
  passport.authenticate("local-signin", {
    failureRedirect: "error/failLogin",
  }),
  authController.successLoginController
);
// authRouter.post("/login", loginController);
authRouter.get("error/failLogin", failLoginController);
// authRouter.get("/successLogin", successLoginController);

// logout
// authRouter.get("/logout", logoutController);
authRouter.get("/logout", logoutController);

//POST /registro --> para dar de alta un nuevo usuario

module.exports = authRouter;
