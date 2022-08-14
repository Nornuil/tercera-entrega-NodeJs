const { isAuthenticated } = require("../middlewares/isAuthenticated");
const pedidosController = require("../controllers/pedidosController");
const PedidosRoutes = require("express").Router();

PedidosRoutes.get(
  "/:idCarrito/:idUsuario",
  isAuthenticated,
  pedidosController.inciarPedido
);

module.exports = PedidosRoutes;
