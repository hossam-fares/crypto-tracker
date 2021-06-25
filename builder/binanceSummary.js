const binance = require('../services/binance')

const build = async () => {
    const accRes = await binance.getAccountSnapshot()
    let marketSummery = ''
    let accountSummery = ''
    let total = 0

    for (const balance of accRes.snapshotVos[0].data.balances) {
        if (balance.free == 0) {
            continue
        }

        assetPricePerUnit = await binance.getAvgPrice(balance.asset).catch(() => 0.00)
        marketSummery += `${balance.asset} => ${assetPricePerUnit}$ \n`
        const currentPrice = assetPricePerUnit * balance.free
        accountSummery += `(${balance.free}) ${balance.asset} => ${parseInt(currentPrice)}$ \n`
        total += currentPrice
    }

    return `Summery:\n________\n\n${marketSummery}\n===============\n\n${accountSummery}\n===============\n\nTotal Crypto amount is ${parseInt(total)}$`
}

module.exports = { build }
