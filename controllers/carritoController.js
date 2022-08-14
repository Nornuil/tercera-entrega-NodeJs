const carritos = require("../service/carrito");
const logger = require("../logger");

const carritosService = new carritos();

//devuelve todos los carritos
async function obtenerCarritos(req, res) {
  logger.info(`GET api/carritos`);
  try {
    const carritosList = await carritosService.getCarritos();
    res.status(200).json(carritosList);
  } catch (err) {
    logger.error(err);
    res.status(err.estado).json(err);
  }
}

//devuelve el contenido carrito enviado como parametro
async function obtenerCarrito(req, res) {
  let idCarrito = req.params.idCarrito;
  logger.info(`GET api/carritos/${idCarrito}`);
  try {
    const carritosList = await carritosService.getCarrito(idCarrito);
    res.status(200).json(carritosList);
  } catch (err) {
    logger.error(err);
    res.status(err.estado).json(err);
  }
}

//Dado un emailUsuario por parametro devuelve todos los carritos del usuario con los productos cargados
async function obtenerCarritosDeUnUsuario(req, res) {
  let emailUsuario = req.params.emailUsuario;
  logger.info(`GET api/carritos/${emailUsuario}`);
  try {
    const carrito = await carritosService.getCarritosDelUsuario(emailUsuario);
    res.status(200).json(carrito);
  } catch (err) {
    logger.error(err);
    res.status(err.estado).json(err);
  }
}

//crea un carrito y devuelve el id asignado
async function crearCarrito(req, res) {
  logger.info(`POST api/carritos`);
  try {
    const carrito = await carritosService.addCarrito(req.body);
    res.status(200).json(carrito);
  } catch (err) {
    logger.error(err);
    res.status(err.estado).json(err);
  }
}

// recibe y agrega un producto al carrito indicado x el body
async function agregarProductoAlCarrito(req, res) {
  let idCarrito = req.params.idCarrito;
  logger.info(`POST api/carritos/${idCarrito}/productos`);
  try {
    const carrito = await carritosService.addProductoAlCarrito(
      idCarrito,
      req.body
    );
    res.status(200).json(carrito);
  } catch (err) {
    logger.error(err);
    res.status(err.estado).json(err);
  }
}

// recibe y elimina un producto al carrito indicado
async function borrarProductoAlCarrito(req, res) {
  let idCarrito = req.params.idCarrito;
  let idProducto = req.params.idProducto;
  logger.info(`DELETE api/carritos/${idCarrito}/productos/${idProducto}`);
  try {
    const carrito = await carritosService.deleteProductoAlCarrito(
      idCarrito,
      idProducto
    );
    res.status(200).json(carrito);
  } catch (err) {
    logger.error(err);
    res.status(err.estado).json(err);
  }
}

// elimina un carrito según su id.
async function borrarCarrito(req, res) {
  let idCarrito = req.params.idCarrito;
  logger.info(`DELETE api/carritos/${idCarrito}`);
  try {
    const carrito = await carritosService.deleteCarrito(idCarrito);
    res.status(200).json(carrito);
  } catch (err) {
    logger.error(err);
    res.status(err.estado).json(err);
  }
}

module.exports = {
  obtenerCarritos,
  obtenerCarrito,
  obtenerCarritosDeUnUsuario,
  crearCarrito,
  agregarProductoAlCarrito,
  borrarProductoAlCarrito,
  borrarCarrito,
};
