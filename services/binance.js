const CryptoJS = require('crypto-js')
const fetch = require('node-fetch');

const getBaseUrl = () => 'https://api' + (Math.floor(Math.random() * 3) + 1) + '.binance.com'
const sign = (qs) => CryptoJS.HmacSHA256(qs, process.env.BINANCE_SECRET).toString()
const headers = { 'Content-Type': 'application/json; charset=UTF-8', 'X-MBX-APIKEY': process.env.BINANCE_KEY}
const sleep = (ms) => new Promise(r => setTimeout(r, ms))
const getAccountSnapshot = async () => {
    const qs = 'type=SPOT&limit=1&timestamp=' + Date.now()
    const url = `${getBaseUrl()}/sapi/v1/accountSnapshot?${qs}&signature=${sign(qs)}`

    return await (await fetch(url, { method: 'GET', headers })).json()
}

const getAvgPrice = async (coin) => {
    await sleep(100)
    return (await (await fetch(`${getBaseUrl()}/api/v3/avgPrice?symbol=${coin}USDT`, { method: 'GET', headers })).json()).price
}

const getSummery = async () => {
    const accRes = await getAccountSnapshot()
    let marketSummery = ''
    let accountSummery = '' 
    let total = 0

    for (const balance of accRes.snapshotVos[0].data.balances) {
        if (balance.free == 0){
            continue
        }

        assetPricePerUnit = await getAvgPrice(balance.asset).catch(() => 0.00)
        marketSummery += `${balance.asset} => ${assetPricePerUnit}$ \n`
        const currentPrice = assetPricePerUnit * balance.free
        accountSummery +=`(${balance.free}) ${balance.asset} => ${parseInt(currentPrice)}$ \n`
        total += currentPrice
    }

    return `Summery:\n________\n\n${marketSummery}\n===============\n\n${accountSummery}\n===============\n\nTotal Crypto amount is ${parseInt(total)}$`
}

module.exports = {getSummery}
