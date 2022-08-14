const { enviarEmail } = require("../communication/email.js");
const { enviarWhatsapp } = require("../communication/whatsapp.js");
const logger = require("../logger");
const userSchema = require("../models/user");

class Usuarios {
  async findPhone(id) {
    try {
      const usuario = await userSchema.findById(id);
      return usuario.telefono;
    } catch (err) {
      logger.error(`Error al buscar el usuario por id - error:${err}`);
      throw new CustomError(401, `Error al buscar el usuario por id`, err);
    }
  }

  //enviarWhatsappNuevoPedido
  async enviarWhatsappRegistro(email, nombre, telefono) {
    logger.info(`Enviando whatsapp de registro...`);
    try {
      let from = "whatsapp:+14155238886"; // es el celu de twilio el que envia whatsapp
      let to = process.env.WHATSAPP_ADMIN; //poner el celular del admin
      let body = `*Nuevo registro*\nNombre:${nombre}\nTelefono:${telefono}\nEmail: ${email}`;
      await enviarWhatsapp(from, to, body);
    } catch (err) {
      logger.error(`Falló el envio de whatsapp - error:${err}`);
    }
  }

  //enviarEmailNuevoUsuario
  async enviarEmailNuevoUsuario(objetoUsuario) {
    logger.info(`Enviando mail de confirmacion...`);
    try {
      let cuerpo = `<h1> Nuevo Registro </h1>
            <p><strong>Email: </strong>${objetoUsuario.email}</p>
            <p><strong>Nombre: </strong>${objetoUsuario.username}</p>
            <p><strong>Edad: </strong>${objetoUsuario.edad}</p>
            <p><strong>Direccion: </strong>${objetoUsuario.direccion}</p>
            <p><strong>Teléfono: </strong>${objetoUsuario.telefono}</p>
            <p><strong>Avatar: </strong>${objetoUsuario.avatarUrl}</p>`;
      await enviarEmail(objetoUsuario.email, "Nuevo Registro", cuerpo);
    } catch (err) {
      logger.error(`Falló el envio de mail - error:${err}`);
    }
  }
}

module.exports = Usuarios;
