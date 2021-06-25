const binance = require('../services/binance')

const build = async () => {
    const balances = await binance.getAccountBalances()
    let marketSummery = ''
    let accountSummery = ''
    let total = 0

    for (const balance of balances) {
        assetPricePerUnit = await binance.getAvgPrice(balance.asset).catch(() => 0.00)
        marketSummery += `${balance.asset} => ${assetPricePerUnit}$ \n`
        const currentPrice = assetPricePerUnit * balance.free
        accountSummery += `(${balance.free}) ${balance.asset} => ${parseInt(currentPrice)}$ \n`
        total += currentPrice
    }

    return `\n\nSummery:\n________\n\n${marketSummery}\n===============\n\n${accountSummery}\n===============\n\nTotal Crypto amount is ${parseInt(total)}$`
}

module.exports = { build }
