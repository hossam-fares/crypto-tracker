require('dotenv').config()

const cmd = require('./cmds/sentSummeryCommand')

exports['Crypto-tracker'] = async (event, context) => {
  await cmd.execute()
}
