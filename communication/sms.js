const twilio = require("twilio");
const logger = require("../logger");

const accountSid = process.env.TWILIO_ACCOUNTSID;
const authToken = process.env.TWILIO_AUTHTOKEN;

const client = twilio(accountSid, authToken);

async function enviarSMS(from, to, body) {
  logger.info(
    "Enviando sms con la notificación del pedido en proceso al usuario ..."
  );

  const options = {
    body: body,
    from: from,
    to: `+54${to}`,
  };

  try {
    const message = await client.messages.create(options);
    logger.info(message);
  } catch (error) {
    logger.error(error);
  }
}

module.exports = { enviarSMS };
