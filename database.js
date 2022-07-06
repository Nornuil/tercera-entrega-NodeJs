const mongoose = require("mongoose");
const logger = require("./logger.js");

try {
  mongoose.connect(process.env.MONGODB_CONEX, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  logger.info("Base de datos online");
} catch (error) {
  logger.fatal("Error en iniciar la base de datos");
  throw new Error("Error en iniciar la base de datos");
}
