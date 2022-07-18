const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userSchema = require("../models/user");
const logger = require("../logger.js");
const User = require("../service/user");
const userController = new User();

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const email = req.body.email;
      const user = await userSchema.findOne({ email });
      if (!user) {
        let newUser = new userSchema(req.body);
        newUser.password = newUser.encryptPassword(req.body.password);
        const userNew = await userSchema.create(newUser);
        userController.enviarEmailNuevoUsuario(req.body);
        logger.info("Usuario creado");
        return done(null, userNew);
      }
      logger.info("Usuario ya registrado");
      done(null, false);
    }
  )
);

passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await userSchema.findOne({ email });
      if (!user) {
        console.log(user);
        logger.info("Usuario no encontrado en db");
        return done(null, false);
      }
      if (!user.comparePassword(password)) {
        logger.info("Contraseña incorrecta");
        return done(null, false);
      }
      logger.info("Usuario logueado exitosamente");
      done(null, user);
    }
  )
);

passport.use(
  "delete-user",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await userSchema.findOne({ email });
      if (!user) {
        console.log(user);
        logger.info("Usuario no encontrado en db");
        return done(null, false);
      }
      if (!user.comparePassword(password)) {
        logger.info("Contraseña incorrecta");
        return done(null, false);
      }
      await userSchema.deleteOne({ email });
      logger.info("Usuario borrado exitosamente");
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  const user = await userSchema.findById(_id);
  done(null, user);
});

module.exports = passport;
