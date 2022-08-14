const productSchema = require("../models/productos");
const mongoose = require("mongoose");

class Productos {
  constructor() {}

  async getProductos() {
    try {
      return await productSchema.find();
    } catch (error) {
      return error;
    }
  }

  async getProducto(id) {
    try {
      return await productSchema.find({ _id: mongoose.Types.ObjectId(id) });
    } catch (error) {
      return error;
    }
  }

  async addProducto(objeto) {
    try {
      const newProducto = new productSchema(objeto);
      return await newProducto.save();
    } catch (error) {
      return error;
    }
  }

  async putProducto(objeto) {
    const { id, ...resto } = objeto;
    console.log(resto);
    try {
      return await productSchema.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id) },
        resto,
        { new: true }
      );
    } catch (error) {
      return { error: error };
    }
  }

  async deleteProducto(id) {
    try {
      const result = await productSchema.findOneAndDelete({
        _id: mongoose.Types.ObjectId(id),
      });
      if (result == null) return { msg: "No se encontro el producto" };
      return { msg: "Producto eliminado" };
    } catch (error) {
      return error;
    }
  }

  #isValid(objeto) {
    console.log(objeto);
    for (let prop in objeto) {
      if (
        objeto[prop] == null ||
        objeto[prop] == "" ||
        objeto[prop] == undefined
      ) {
        console.log("sale por false");
        return false;
      }
    }
    console.log("sale por true");
    return true;
  }
}

module.exports = Productos;
