const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs"); //encripta la contraseña

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  direccion: { type: String },
  edad: { type: Number },
  telefono: { type: Number },
  avatarUrl: { type: String },
});
//encripta el password antes de guardarlo en la db
userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
//compara el password con el encriptado de la db
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user", userSchema);
