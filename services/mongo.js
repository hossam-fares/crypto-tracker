const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI
const mongo = () => new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const findLastTrackedPrice = async (crypto) =>{
    const client = await mongo().connect()
    const db = client.db("test")
    const cryptoCollection = db.collection("crypto");
    const doc = await cryptoCollection.findOne({
        asset: crypto
    })

    client.close()

    return doc?.lastTrackedPrice || 0
}

const insertCryptoPrice = async (crypto, price) => {
    const client = await mongo().connect()
    const db = client.db("test")
    const cryptoCollection = db.collection("crypto");
    await cryptoCollection.deleteOne({asset: crypto})
    await cryptoCollection.insertOne({
        asset: crypto,
        lastTrackedPrice: price
    })

    client.close()
}

module.exports = {findLastTrackedPrice, insertCryptoPrice}
