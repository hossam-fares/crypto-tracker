require('dotenv').config()

const cmd = require('./cmds/sentSummeryCommand')

exports.helloPubSub = async (event, context) => {
  await cmd.execute()
}
