// import PedidosDao from '../model/daos/PedidosDao.js';
// import UsuariosDao from '../model/daos/UsuariosDao.js';
// import PedidosDto from '../model/dtos/PedidosDto.js';
// import CustomError from '../errores/CustomError.js'
const logger = require("../logger.js");
// import { enviarEmail } from './notificaciones/email.js'
const { enviarWhatsapp } = require("../communication/whatsapp.js");
const { enviarSMS } = require("../communication/sms.js");
const Usuarios = require("./user");
const usuarioService = new Usuarios();
const Carritos = require("./carrito");
const carritoService = new Carritos();

class Pedidos {
  async enviarPedido(idCarrito, idUsuario) {
    try {
      this.enviarSMSPedidoEnProceso(idCarrito, idUsuario);
      this.enviarWhatsappPedidoEnProceso(idCarrito, idUsuario);
      return "Pedido enviado por sms y whatsapp";
    } catch (err) {
      logger.error(
        `Falló el envio de whatsapp del nuevo pedido - error:${err}`
      );
      return err;
    }
  }
  // constructor() {
  //     // this.pedidosDao = new PedidosDao();
  //     // this.usuariosDao = new UsuariosDao();
  // }

  // async getPedidos() {
  //     try{
  //         return await this.pedidosDao.getAll();
  //     }
  //     catch (err){
  //         logger.error(`Error al solicitar todos los pedidos: ${err}`);
  //         throw new CustomError(401, `Error al solicitar todos los pedidos`, err)
  //     }
  // }

  // async getPedido(idPedido) {
  //     try{
  //         return await this.pedidosDao.getById(idPedido);
  //     }
  //     catch (err){
  //         logger.error(`Error al solicitar el pedido ${idPedido}: ${err}`);
  //         throw new CustomError(401, `Error al solicitar el pedido ${idPedido}`, err)
  //     }
  // }

  // async getPedidosPorEmail(email) {
  //     if (!email) throw new CustomError(404, `El campo 'email' es obligatorio `)
  //     try{
  //         const pedidosObj = await this.pedidosDao.getByEmail(email);
  //         return new PedidosDto(pedidosObj);
  //     }
  //     catch (err){
  //         logger.error(`Error solicitar los pedidos de un usuario: ${err}`);
  //         throw new CustomError(401, `Error solicitar los pedidos de un usuario`, err)
  //     }
  // }

  // async addPedido(objeto) {

  //     try{
  //         //cargo el pedido
  //         const pedido = new PedidosDto(objeto)
  //         await this.pedidosDao.add(pedido);
  //         logger.info(`Registro de pedido Ok `);
  //         //obtengo los datos del usuario
  //         const usuario = await this.usuariosDao.getByEmail(pedido.email)
  //         //envio de notificaciones al admin y usuario
  //         await this.enviarEmailNuevoPedido(pedido, usuario.nombre, usuario.apellido)
  //         //await this.enviarWhatsappNuevoPedido(pedido.email, usuario.nombre, usuario.apellido)
  //         //await this.enviarSMSPedidoEnProceso(usuario.telefono)
  //         return pedido.get();
  //     }
  //     catch (err){
  //         logger.error(`Error al agregar un pedido: ${err}`);
  //         throw new CustomError(401, `Error al agregar un pedido`, err)
  //     }
  // }

  // //deletePedido
  // async deletePedido(idPedido) {
  //     try{
  //         return await this.pedidosDao.deleteById(idPedido);
  //     }
  //     catch (err){
  //         logger.error(`Error al borrar el pedido ${idPedido}: ${err}`);
  //         throw new CustomError(401, `Error al borrar el pedido ${idPedido}`, err)
  //     }
  // }

  // //enviarEmailNuevoUsuario
  // async enviarEmailNuevoPedido(pedido, nombre, apellido){
  //     try {
  //         //convierto objeto a array
  //         const objetoPedidos = pedido.productos
  //         var arrayPedido = objetoPedidos.map(function(o) {
  //             return Object.keys(o).reduce(function(array, key) {
  //                 return array.concat([key, o[key]]);
  //             }, []);
  //         })
  //         //armo listado de productos para enviar por email
  //         let listadoProductosHTML = ""
  //         for (let i=0; i < arrayPedido.length; i++){
  //             listadoProductosHTML = listadoProductosHTML + "<tr><td>"+arrayPedido[i][1]+"</td><td>"+arrayPedido[i][3]+"</td><td>"+arrayPedido[i][5]+"</td></tr>"
  //         }

  //         //armo los datos que voy a enviar por email
  //         let correoDestino = process.env.MAIL_USER_ADMIN
  //         let asunto = `Nuevo pedido de ${nombre} ${apellido} - ${pedido.email}`
  //         let cuerpo = `<h1> Nuevo Pedido de ${nombre} ${apellido} - ${pedido.email}</h1>
  //         <p><strong>Email del usuario: </strong>${pedido.email}</p>
  //         <p><strong>Estado del pedido: </strong>${pedido.estado}</p>
  //         <p><strong>Fecha de la compra por el usuario: </strong>${pedido.fechaPedida}</p>
  //         <p><strong>Productos comprados: </strong></p>
  //         <p>
  //         <table border=1>
  //             <tr>
  //                 <th>Id Producto</th>
  //                 <th>precio</th>
  //                 <th>cantidad</th>
  //             </tr>
  //             ${listadoProductosHTML}
  //         </table></p>`
  //         await enviarEmail(correoDestino, asunto, cuerpo)
  //     } catch (err) {
  //         logger.error(`Falló el envio de mail del nuevo pedido - error:${err}`)
  //     }
  // }

  // //enviarWhatsappNuevoPedido
  // async enviarWhatsappNuevoPedido(email, nombre, apellido){
  //     try {
  //         let from = 'whatsapp:+14155238886'  // es el celu de twilio el que envia whatsapp
  //         let to = process.env.WHATSAPP_USER_ADMIN
  //         let body = `Nuevo pedido de ${nombre} ${apellido} - ${email}`
  //         // mediaUrl: [ '' ]
  //         await enviarWhatsapp(from, to, body)
  //     } catch (err) {
  //         logger.error(`Falló el envio de whatsapp del nuevo pedido - error:${err}`)
  //     }
  // }

  //enviarSMSPedidoEnProceso
  async enviarSMSPedidoEnProceso(idCarrito, idUsuario) {
    try {
      let from = process.env.SMS_messagingServiceSid;
      let to = await usuarioService.findPhone(idUsuario);
      let body = `Su pedido ha sido recibido y se encuentra en proceso : ${await carritoService.getProductOfCarrito(
        idCarrito
      )}}`;
      await enviarSMS(from, to, body);
    } catch (err) {
      logger.error(
        `Falló el envio de SMS de confirmarción al usuario - error:${err}`
      );
    }
  }

  async enviarWhatsappPedidoEnProceso(idCarrito, idUsuario) {
    try {
      let from = "whatsapp:+14155238886"; // es el celu de twilio el que envia whatsapp
      let to = await usuarioService.findPhone(idUsuario);
      let body = `Su pedido ha sido recibido y se encuentra en proceso : ${await carritoService.getProductOfCarrito(
        idCarrito
      )}}`;
      await enviarWhatsapp(from, to, body);
    } catch (err) {
      logger.error(
        `Falló el envio de whatsapp del nuevo pedido - error:${err}`
      );
    }
  }
}

module.exports = Pedidos;
