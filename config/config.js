const dotenv = require("dotenv");

dotenv.config();

const ServidorEnvioEmail = {
  service: "gmail",
  port: 587,
  auth: {
    user: "nornuil223@gmail.com",
    pass: "",
  },
};

module.exports = ServidorEnvioEmail;
