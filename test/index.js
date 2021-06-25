require('dotenv').config()

const sentSummeryCommand = require('../cmds/sentSummeryCommand')
const trackPricesCommand = require('../cmds/trackPricesCommand')

const index = async (event, context) => {
    if (await trackPricesCommand.execute()) {
        await sentSummeryCommand.execute()
    }
}

index()
