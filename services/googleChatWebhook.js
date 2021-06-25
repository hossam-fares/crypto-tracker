const fetch = require('node-fetch');
const webhookURL = 'https://chat.googleapis.com/v1/spaces/AAAAEnmJLGI/messages?key=' + process.env.GOOGLE_CHAT_KEY;

const post = async (message) => {
  console.log(message)
  return await fetch(
    webhookURL,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ text: message })
    }
  )
}

module.exports = { post }
