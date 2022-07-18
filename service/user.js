const { enviarEmail } = require("../communication/email.js");
const { enviarWhatsapp } = require("../communication/whatsapp.js");
const logger = require("../logger");

class Usuarios {
  // constructor() {
  //     this.usuariosDao = new UsuariosDao();
  // }

  // async getUsuarios() {
  //     logger.info(`UsuariosApi.js - getUsuarios`);
  //     const usuariosObj = await this.usuariosDao.getAll();
  //     return usuariosObj;
  // }

  // //alta de usuario nuevo
  // async crearUsuario(objetoUsuario){
  //     logger.info(`UsuariosApi.js - crearUsuario`);
  //     if (!objetoUsuario.username) throw new CustomError(404, `El campo 'email' es obligatorio `)
  //     if (!objetoUsuario.password) throw new CustomError(404, `El campo 'password' es obligatorio `)

  //     try{
  //         const usuario = new UsuarioDto(objetoUsuario)
  //         usuario._id = await this.usuariosDao.add(usuario)
  //         logger.info(`Registro de Usuario Ok `);
  //         await this.enviarEmailNuevoUsuario(usuario)
  //         return usuario.get()
  //     }
  //     catch (err){
  //         logger.error(`Error al crear el usuario: ${err}`);
  //         throw new CustomError(401, `Error al crear el usuario`, err)
  //     }
  // }

  // //deletePedido
  // async deleteUsuario(email) {
  //     logger.info(`UsuariosApi.js - deleteUsuario`);

  //     try{
  //         return await this.usuariosDao.deleteByEmail(email);
  //     }
  //     catch (err){
  //         logger.error(`Error al borrar el usuario con email: ${email}: ${err}`);
  //         throw new CustomError(401, `Error al borrar el usuario con email: ${email}`, err)
  //     }
  // }

  // //login de usuario
  // async login(email, password){
  //     logger.info(`UsuariosApi.js - login`)
  //     try{
  //         const data = await this.usuariosDao.getByEmail(email)
  //         const usuario = new UsuarioDto(data)
  //         if (!usuario.isValidPassword(password))
  //             return false
  //         else
  //             return usuario.get();
  //     }
  //     catch(err){
  //          logger.error(`Error al loguearse: ${JSON.stringify(err)}`)
  //          throw new CustomError(401, `Error al loguearse`, err)
  //     }
  // }

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
