const authRouter = require("express").Router();
const passport = require("passport");
const {
  isAuthenticated,
  isNotAuthenticated,
} = require("../middlewares/isAuthenticated");

const {
  failLoginController,
  successLoginController,
  failRegisterController,
  successRegisterController,
  logoutController,
  profileController,
  failDeleteController,
  successDeleteController,
} = require("../controllers/authController");

//Registro
authRouter.post(
  "/registro",
  passport.authenticate("local-signup", {
    failureRedirect: "error/register/",
    successRedirect: "success/register/",
  })
);
authRouter.get("/error/register", failRegisterController);
authRouter.get("/success/register", successRegisterController);

//Login
authRouter.post(
  "/login",
  passport.authenticate("local-signin", {
    failureRedirect: "error/login/",
    successRedirect: "success/login/",
  })
);
authRouter.get("/error/login", failLoginController);
authRouter.get("/success/login", successLoginController);

//Logout
authRouter.get("/logout", isNotAuthenticated, logoutController);

//Profile
authRouter.get("/profile", isAuthenticated, profileController);

//Delete
authRouter.delete(
  "/delete",
  passport.authenticate("delete-user", {
    failureRedirect: "error/delete/",
    successRedirect: "success/delete/",
  })
);
authRouter.get("/error/delete", failDeleteController);
authRouter.get("/success/delete", successDeleteController);

module.exports = authRouter;
