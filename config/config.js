const dotenv = require("dotenv");

dotenv.config();

const ServidorEnvioEmail = {
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASS,
  },
};

module.exports = ServidorEnvioEmail;
