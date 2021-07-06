# Free binance crypto tracker

  This application can track your binance wallet and sent notification if a specific asset goes up or down more than 10%
  
## How can I run the app?

  1. Create Binance API key & secret key

    - To read your wallet data, you need to create biniance key & secret 'read only is fine', you can follow [this toutorial](https://www.binance.com/en/support/faq/360002502072) to have it
    - Save api key and secret to your `.env` file, same like `.env.example` shows
    
  2. Create google chat webhook url
  
    - To sent a notification to you when prices changes, you need to create google chat webhook url using [this documentation](https://developers.google.com/chat/how-tos/webhooks)
    - Save webhook url to your `.env` file, same like `.env.example` shows
    
  3. Create mongoDB
  
    - We need to store the data in DB to, you can get free tier database from mongoDb atlas and get the connection URI, following [this link](https://www.mongodb.com/cloud/atlas/lp/try2)
    - Save mongoDB connection URI to your `.env` file, same like `.env.example` shows

  4. Run the app
    
     - `npm install`
     - `npm run main`

## How can I run the app as a cloud function and trigger it every X minutes?
    
    to be added
