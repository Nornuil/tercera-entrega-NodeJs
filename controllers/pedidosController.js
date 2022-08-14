const pedidos = require("../service/pedidos");
const logger = require("../logger");

const pedidosService = new pedidos();

//Inicia el pedido enviado los datos de la compra por sms y whatsapp
async function inciarPedido(req, res) {
  logger.info(`POST api/pedidos`);
  try {
    const carritosList = await pedidosService.enviarPedido(
      req.params.idCarrito,
      req.params.idUsuario
    );
    res.status(200).json(carritosList);
  } catch (err) {
    logger.error(err);
    res.status(err.estado).json(err);
  }
}

module.exports = { inciarPedido };
