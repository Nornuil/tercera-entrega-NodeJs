const productosService = require("../service/productos.js");
const logger = require("../logger");

const productService = new productosService();

async function obtenerProductos(req, res) {
  logger.info(`GET api/productos`);
  try {
    const productosList = await productService.getProductos();
    res.status(200).json(productosList);
  } catch (err) {
    logger.error(err);
    res.status(err.estado).json(err);
  }
}

async function obtenerUnProducto(req, res) {
  logger.info(`GET api/productos/{idProducto}`);
  try {
    let id = req.params.idProducto;
    const producto = await productService.getProducto(id);
    res.status(200).json(producto);
  } catch (err) {
    logger.error(err);
    res.status(err.estado).json(err);
  }
}

async function agregarProducto(req, res) {
  logger.info(`POST api/productos`);
  try {
    const producto = await productService.addProducto(req.body);
    res.status(200).json(producto);
  } catch (err) {
    logger.error(err);
    res.status(err.estado).json(err);
  }
}

async function actualizarProducto(req, res) {
  logger.info(`PUT api/productos`);
  try {
    let objeto = req.body;
    const producto = await productService.putProducto(objeto);
    res.status(200).json(producto);
  } catch (err) {
    logger.error(err);
    res.status(err.estado).json(err);
  }
}

async function borrarProducto(req, res) {
  logger.info(`DELETE api/productos`);
  try {
    let id = req.params.idProducto;
    const producto = await productService.deleteProducto(id);
    res.status(200).json(producto);
  } catch (err) {
    logger.error(err);
    res.status(err.estado).json(err);
  }
}

module.exports = {
  obtenerProductos,
  obtenerUnProducto,
  agregarProducto,
  actualizarProducto,
  borrarProducto,
};
