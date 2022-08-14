const {
  isAuthenticated,
  isIdProductValid,
} = require("../middlewares/isAuthenticated");
const carritosController = require("../controllers/carritoController");
const CarritosRoutes = require("express").Router();

//GET '/carrito' -> devuelve todos los carritos
CarritosRoutes.get("/", isAuthenticated, carritosController.obtenerCarritos);
//GET '/carrito/:idCarrito' -> devuelve el contenido de un carrito
CarritosRoutes.get(
  "/:idCarrito",
  isAuthenticated,
  carritosController.obtenerCarrito
);
//POST '/carrito' -> crea un carrito y devuelve el id asignado
CarritosRoutes.post("/", isAuthenticated, carritosController.crearCarrito);
//POST '/carrito/:id/productos' -> agrega un producto al carrito indicado x el body
CarritosRoutes.post(
  "/:idCarrito/productos",
  isAuthenticated,
  isIdProductValid,
  carritosController.agregarProductoAlCarrito
);
//DELETE '/carrito/:id/producto/:id' -> elimina un producto al carrito indicado
CarritosRoutes.delete(
  "/:idCarrito/productos/:idProducto",
  isAuthenticated,
  carritosController.borrarProductoAlCarrito
);
//DELETE '/carrito/:idCarrito' -> elimina un carrito según su id.
CarritosRoutes.delete(
  "/:idCarrito",
  isAuthenticated,
  carritosController.borrarCarrito
);

module.exports = CarritosRoutes;
