const { Router } = require("express");
const os = require("os");
const cantidadDeCPUs = os.cpus().length;

const infoRoutes = new Router();

//GET '/info' -> devuelve info del process
infoRoutes.get("/", (_req, res) => {
  const objeto = {
    argumentos_entrada: process.argv.slice(2),
    plataforma: process.platform,
    version_node: process.version,
    memoria_total_reservada: process.memoryUsage().rss,
    path_ejecucion: process.execPath,
    process_id: process.pid,
    carpeta_proyecto: process.cwd(),
    cantidad_cpus: cantidadDeCPUs,
  };

  res.status(200).json(objeto);
});

module.exports = infoRoutes;
