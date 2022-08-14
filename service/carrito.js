const carritoSchema = require("../models/carritos");
var mongoose = require("mongoose");

class Carritos {
  async addCarrito(objeto) {
    try {
      const newCarrito = new carritoSchema(objeto);
      return await newCarrito.save();
    } catch (error) {
      return error;
    }
  }

  async getCarritos() {
    try {
      return await carritoSchema.find();
    } catch (error) {
      return error;
    }
  }

  async getCarrito(id) {
    try {
      return await carritoSchema.find({ _id: mongoose.Types.ObjectId(id) });
    } catch (error) {
      return error;
    }
  }

  async addProductoAlCarrito(id, producto) {
    try {
      const carrito = await carritoSchema.find({
        _id: mongoose.Types.ObjectId(id),
      });
      carrito[0].productos.push(producto);
      console.log(carrito[0].productos);
      return await carritoSchema.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id) },
        { $set: { productos: carrito[0].productos } },
        { new: true }
      );
    } catch (error) {
      return error;
    }
  }

  async deleteProductoAlCarrito(id, idProducto) {
    try {
      const carrito = await carritoSchema.find({
        _id: mongoose.Types.ObjectId(id),
      });
      carrito[0].productos.splice(idProducto, 1);
      return await carritoSchema.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id) },
        { $set: { productos: carrito[0].productos } },
        { new: true }
      );
    } catch (error) {
      return error;
    }
  }

  async deleteCarrito(id) {
    try {
      const result = await carritoSchema.findOneAndDelete({
        _id: mongoose.Types.ObjectId(id),
      });
      if (result == null) return { msg: "No se encontro el carrito" };
      return { msg: "Carrito eliminado" };
    } catch (error) {
      return error;
    }
  }

  async getProductOfCarrito(id) {
    try {
      const carrito = await carritoSchema.find({
        _id: mongoose.Types.ObjectId(id),
      });
      console.log(carrito[0].productos);
      return JSON.stringify(carrito[0].productos);
    } catch (error) {
      return error;
    }
  }
}

module.exports = Carritos;
