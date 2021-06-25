const binanceSummary = require('../builder/binanceSummary')
const googleCWH = require('../services/googleChatWebhook')

const execute = async () => {
  const message = await binanceSummary.build()
  await googleCWH.post(message)
}

module.exports = { execute }