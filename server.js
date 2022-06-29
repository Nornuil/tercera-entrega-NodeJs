//pm2 start server.js --name="Server1" --watch -- 8081 FORK

const express = require("express");
require("dotenv").config();
const path = require("path");
const engine = require("ejs-mate"); //plantillas partials etc para las vistas
const flash = require("connect-flash"); //le da un mensaje de la pagina anterior
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan"); //es para ver las peticiones que el cliente nos presenta en la consola
// const yargs = require("yargs/yargs")(process.argv.slice(2));
const cluster = require("cluster");
const { cpus } = require("os");
const comprimir = require("compression");
const infoRoutes = require("./routes/info.js");
// const infoComprimidoRoutes = require("./routes/infoComprimido.js");
// const PORT = parseInt(process.argv[2]) || 8080;
const PORT = 8080;
const modoCluster = process.argv[3] == "CLUSTER";
const logger = require("./logger.js");
// initializations
const app = express();
require("./database");
require("./passport/local-auth");
// settings
app.set("port", process.env.PORT || PORT);
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");

// middlewares
app.use(morgan("dev")); //muestra las peticiones desde el front
app.use(express.urlencoded({ extended: false })); //es para recibir los datos de un formulario
app.use(
  session({
    secret: "mysecretsession",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//para los mensajes
app.use((req, res, next) => {
  app.locals.signinMessage = req.flash("signinMessage");
  app.locals.signupMessage = req.flash("signupMessage");
  app.locals.user = req.user;
  // console.log(app.locals);
  next();
});

// rutas
app.use("/", require("./routes/index"));
app.use("/randoms", require("./routes/apiRandom"));
app.use("/randomsComp", comprimir(), require("./routes/apiRandom"));
app.use("/info", infoRoutes);
app.use("/infoComp", comprimir(), infoRoutes);

// Levanto puerto

if (modoCluster && cluster.isPrimary) {
  const numCPUs = cpus().length;

  console.log(`Número de procesadores: ${numCPUs}`);
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(
      "Worker",
      worker.process.pid,
      "died",
      new Date().toLocaleString()
    );
    cluster.fork();
  });
} else {
  app.listen(process.env.PORT || PORT, (err) => {
    if (!err)
      // console.log(
      //   `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
      // );
      logger.info(
        `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
      );
  });
  app.on("error", (error) => logger.error(`Server error ${error}`));
}

const worker = { hola: "hola", hjoasfd: "sdfoiuh" };
