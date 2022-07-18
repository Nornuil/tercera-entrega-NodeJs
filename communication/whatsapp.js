const twilio = require("twilio");
const logger = require("../logger");
const accountSid = process.env.TWILIO_ACCOUNTSID;
const authToken = process.env.TWILIO_AUTHTOKEN;
const client = twilio(accountSid, authToken);

async function enviarWhatsapp(from, to, body) {
  logger.info("Enviando whatsapp con la notificación de registro...");

  const options = {
    body: body,
    from: from,
    to: `whatsapp:${to}`,
  };

  try {
    const message = await client.messages.create(options);
    logger.info(message);
  } catch (error) {
    logger.error(error);
  }
}

module.exports = { enviarWhatsapp };
