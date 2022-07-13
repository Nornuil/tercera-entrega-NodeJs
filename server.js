//pm2 start server.js --name="Server1" --watch -- 8081 FORK
const express = require("express");
require("dotenv").config();
const path = require("path");
const engine = require("ejs-mate"); //plantillas partials etc para las vistas
const flash = require("connect-flash"); //le da un mensaje de la pagina anterior
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan"); //es para ver las peticiones que el cliente nos presenta en la consola
const cluster = require("cluster");
const { cpus } = require("os");
const PORT = 8081;
const modoCluster = process.argv[3] == "CLUSTER";
const logger = require("./logger.js");
const userRoutes = require("./routes/authRouter");

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
app.use(express.json());
app.use(
  session({
    secret: "mysecretsession",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// rutas
app.use("/auth", userRoutes);

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
      logger.info(
        `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
      );
  });
  app.on("error", (error) => logger.error(`Server error ${error}`));
}
