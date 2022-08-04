// import ContainerDao from "./ContainerDao.js";
// import CustomError from "../../errores/CustomError.js";
const CustomError = require("../errores/CustomError");
const ContainerDao = require("./ContainerDao");

class ProductosDao extends ContainerDao {
  constructor() {
    super("productos");
  }

  async getById(id) {
    return await super.getById({ id: id });
  }

  async deleteById(id) {
    return await super.deleteById({ id: id });
  }

  async searchByName(name) {
    return await super.listByQuery({ nombre: name });
  }

  async update({ id, nombre, descripcion, precio, imagenURL, stock }) {
    try {
      await this.collection.updateOne(
        {
          id: id,
        },
        {
          $set: {
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            imagenURL: imagenURL,
            stock: stock,
          },
        }
      );
    } catch (err) {
      logger.error(err);
      throw new CustomError(
        500,
        "Error update mongo document to collection by id",
        err
      );
    }
  }
}

module.exports = ProductosDao;
