require('dotenv').config()

const sentSummeryCommand = require('./cmds/sentSummeryCommand')
const trackPricesCommand = require('./cmds/trackPricesCommand')

exports['Crypto-tracker'] = async (event, context) => {
  if (await trackPricesCommand.execute()) {
    await sentSummeryCommand.execute()
  }
}
