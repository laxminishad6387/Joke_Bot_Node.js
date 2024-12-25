const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables
dotenv.config();

// Log the token for debugging
if (!process.env.TELEGRAM_TOKEN) {
    console.error("Error: TELEGRAM_TOKEN is not defined. Check your .env file.");
    process.exit(1);
}
console.log("Telegram Token Loaded Successfully.");

// Initialize the bot
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// Default message handler
bot.on('message', (option) => {
    if (!option.text.startsWith('/')) {
        console.log("Message received:", option.text);
        bot.sendMessage(option.chat.id, "Hello, I am your bot. Type /help to learn more about my features. if u want to read any joke. plz type /joke command");
    }
});

// Handle /joke command
bot.onText(/\/joke/, async (option) => {
    try {
        const response = await axios.get('https://hindi-jokes-api.onrender.com/jokes?api_key=c70afb601fc2921ad8627dba9a16');
        const jokeContent = response.data.jokeContent;
        bot.sendMessage(option.chat.id, jokeContent);
      
    } catch (error) {
        console.error("Error fetching joke:", error.message);
        bot.sendMessage(option.chat.id, "Sorry, I couldn't fetch a joke at the moment. Please try again later.");
    }
});
