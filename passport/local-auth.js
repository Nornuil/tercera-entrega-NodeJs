const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy } = require("passport-local");
const User = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      console.log(req.body, email, password);
      const user = await User.findOne({ email: email });
      console.log(user);
      if (user) {
        return done(
          null,
          user,
          false
          // req.flash("signupMessage", "El email ya esta registrado.")
        );
      } else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        console.log(newUser);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);

//estragegia de registro
passport.use(
  "registro",
  new Strategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      logger.info(`PassportController.js - passport.use --> registro`);
      let usuario;
      //valido si existe el usuario
      try {
        console.log(username, password, req.body);
        // await users.obtenerUsuarioPorEmail(username) //si encuentra usuario quiere decir q ya esta registrado
        return done(null, false); //false pq no se genero ningun cambio en el registro
      } catch (error) {
        //todo OK, o sea no encontro el usuario
      }
      //si no existe lo creo
      try {
        const datosUsuario = req.body;
        console.log(datosUsuario);
        // usuario = await  users.crearUsuario(datosUsuario) //crear usuario
      } catch (error) {
        return done(error);
      }
      done(null, usuario);
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
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(
          null,
          false,
          req.flash("signinMessage", "Usuario no encontrado")
        );
      }
      if (!user.comparePassword(password)) {
        return done(
          null,
          false,
          req.flash("signinMessage", "Contraseña incorrecta")
        );
      }
      return done(null, user);
    }
  )
);

module.exports = passport;
