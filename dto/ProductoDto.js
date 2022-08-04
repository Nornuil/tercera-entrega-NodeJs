// import NUID from 'nuid'
// import moment from 'moment'

const NUID = require("nuid");
const moment = require("moment");

class ProductoDto {
  //   _id;
  //   id;
  //   fechaHora;
  //   nombre;
  //   descripcion;
  //   precio;
  //   imagenURL;
  //   stock;

  constructor({
    _id,
    id,
    fechaHora,
    nombre,
    descripcion,
    precio,
    imagenURL,
    stock,
  }) {
    if (_id === undefined) {
      this._id = undefined;
      this.id = NUID.next();
      this.fechaHora = moment(new Date()).format("DD/MM/YYYY HH:MM:SS");
    } else {
      this._id = _id;
      this.id = id;
      this.fechaHora = fechaHora;
    }

    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagenURL = imagenURL;
    this.stock = stock;
  }

  get() {
    return this;
  }

  getforCarrito() {
    return {
      id: this.id,
      nombre: this.nombre,
      precio: this.precio,
    };
  }
}

module.exports = ProductoDto;
