require('dotenv').config()

const cmd = require('../cmds/sentSummeryCommand')

const index = async (event, context) => {
    await cmd.execute()
}
  
index()