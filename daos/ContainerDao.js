const { MongoClient } = require("mongodb");
const logger = require("../logger");
const CustomError = require("../errores/CustomError");

const mongo_url = process.env.MONGODB_CONEX;
const base = process.env.MONGO_BASE;

const client = new MongoClient(mongo_url, { serverSelectionTimeOutMS: 5000 });
client.connect();

class ContainerDao {
  constructor(collection) {
    this.collectionName = collection;
    this.collection = client.db(base).collection(collection);
    logger.info(`Mongo Base:${base} collection: ${collection} instanciada`);
  }

  async getAll() {
    try {
      const array = await this.collection.find().toArray();
      return array;
    } catch (err) {
      logger.error(err);
      throw new CustomError(
        500,
        `Error getting all records in collection ${this.collectionName}`,
        err
      );
    }
  }

  async getById(query) {
    console.log(query);
    let respuesta;
    try {
      respuesta = await this.collection.findOne(query);
    } catch (err) {
      logger.error(err);
      throw new CustomError(
        500,
        `Error when obtaining a Document by id in the collection ${this.collectionName}`,
        err
      );
    }

    if (!respuesta) {
      throw new CustomError(
        404,
        `Document not found in ${this.coleccionName} with that ${JSON.stringify(
          query
        )}`
      );
    }
    return respuesta;
  }

  async add(data) {
    try {
      const { insertedId } = await this.collection.insertOne(data);
      return insertedId;
    } catch (err) {
      logger.error(err);
      throw new CustomError(
        500,
        `Error adding mongo document to collection ${this.collectionName}`,
        err
      );
    }
  }

  async deleteById(query) {
    await this.collection.deleteOne(query, function (err, obj) {
      if (err) {
        logger.error(err);
        throw new CustomError(
          500,
          `Error when delete a documents in collection ${this.collectionName}`,
          err
        );
      }
    });
  }

  async listByQuery(query) {
    try {
      const array = await this.collection.find(query).toArray();
      return array;
    } catch (err) {
      throw new CustomError(
        500,
        `error getting all records in collection ${this.coleccionName}`,
        err
      );
    }
  }
}

module.exports = ContainerDao;
