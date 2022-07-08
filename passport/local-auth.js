const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userSchema = require("../models/user");
const logger = require("../logger.js");
const bcrypt = require("bcrypt-nodejs");
const user = require("../models/user");

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
        let newUser = req.body;
        newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        console.log(newUser);
        const userNew = await userSchema.create(newUser);
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
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const user1 = await user.findOne({
        email: req.body.email,
      });
      // console.log(req.body.pass);

      console.log(user1.comparePassword(req.body.password));
      // if (user) {
      //   console.log(user);
      //   logger.info("Usuario encontrado en db");
      //   }
      //   const result = await user.comparePassword(req.body.password);
      //   if (result) {
      //     logger.info("Usuario encontrado en db");
      //     return done(null, user);
      //   } else {
      //     logger.info("Contraseña incorrecta");
      return done(null, false);
      //   }

      // bcrypt.compare(req.body.password, user.password, function (err, res) {
      //   if (err) {
      //     // handle error
      //     logger.info("mal contraseña");
      //     return done(null, false);
      //   }
      //   if (res) {
      //     logger.info("logueado ok");
      //     return done(null, false);
      //     // Send JWT
      //   } else {
      //     // response is OutgoingMessage object that server response http request
      //     logger.info("mal contraseña2");
      //     return done(null, false);
      //   }
      // });
      // }
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
