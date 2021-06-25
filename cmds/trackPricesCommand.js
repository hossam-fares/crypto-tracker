const binance = require('../services/binance')
const googleCWH = require('../services/googleChatWebhook')
const { findLastTrackedPrice, insertCryptoPrice } = require('../services/mongo')

const execute = async () => {
    let summary = ''
    const balances = await binance.getAccountBalances()

    for (const balance of balances) {
        const lastTrakedPrice = await findLastTrackedPrice(balance.asset)
        const currentPrice = await binance.getAvgPrice(balance.asset)
        const percentage = parseInt((currentPrice - lastTrakedPrice) / lastTrakedPrice * 100)

        if (lastTrakedPrice !== 0 && (percentage > 10 || percentage < -10)) {
            summary += `** ${balance.asset} price changed from ${lastTrakedPrice} to ${currentPrice} (${percentage}%) **`
            await insertCryptoPrice(balance.asset, currentPrice)
        }
    }

    if (summary.length > 0) {
        await googleCWH.post(summary)
        return true
    }
}

module.exports = { execute }
