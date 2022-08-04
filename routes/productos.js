const {
  isAuthenticated,
  isProductDataValid,
  isProductPropertyEmpty,
} = require("../middlewares/isAuthenticated");
const productosController = require("../controllers/productosController");
const ProductosRoutes = require("express").Router();

ProductosRoutes.get("/", productosController.obtenerProductos);
ProductosRoutes.get("/:idProducto", productosController.obtenerUnProducto);
ProductosRoutes.post(
  "/",
  isAuthenticated,
  isProductDataValid,
  productosController.agregarProducto
);
ProductosRoutes.put(
  "/",
  isAuthenticated,
  isProductPropertyEmpty,
  productosController.actualizarProducto
);
ProductosRoutes.delete(
  "/:idProducto",
  isAuthenticated,
  productosController.borrarProducto
);

module.exports = ProductosRoutes;
