const binance = require('../services/binance')
const googleCWH = require('../services/googleChatWebhook')

const execute = async() => {
  const message = await binance.getSummery()
  await googleCWH.post(message)
}

module.exports = {execute}