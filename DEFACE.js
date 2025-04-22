const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const port = 3000;

// Ganti dengan token bot Anda
const token = '7863322072:AAFLohSBYqeTpx8eLrsZz0YBD_4rEP627-4';
const bot = new TelegramBot(token, {polling: true});

// Menu utama
const mainMenu = {
    reply_markup: {
        keyboard: [
            ['🛠 VPS Tools', '🎮DEFACE FREE FIRE'],
            ['📊 Server Status', 'ℹ️ Info']
        ],
        resize_keyboard: true
    }
};

// Mulai bot
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Selamat datang di Tamlilan Bot!', mainMenu);
});

// Handler untuk menu
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '🛠 VPS Tools') {
        showVpsTools(chatId);
    } else if (text === '🎮 Game Deface') {
        showGameDeface(chatId);
    }
});

function showVpsTools(chatId) {
    const vpsMenu = {
        reply_markup: {
            inline_keyboard: [
                [{text: '🔄 Restart Server', callback_data: 'restart_vps'}],
                [{text: '📶 Check Ping', callback_data: 'check_ping'}],
                [{text: '📁 File Manager', callback_data: 'file_manager'}]
            ]
        }
    };
    bot.sendMessage(chatId, 'Pilih tool VPS:', vpsMenu);
}

function showGameDeface(chatId) {
    // Kiram pesan dengan HTML embed game
    const gameUrl = `http://your-server-ip:${port}/game.html`;
    bot.sendMessage(chatId, `🎮 Mainkan Game Deface Free Fire:\n${gameUrl}`);
}

// Callback handler
bot.on('callback_query', (callbackQuery) => {
    const msg = callbackQuery.message;
    const data = callbackQuery.data;
    
    if (data === 'restart_vps') {
        // Kode untuk restart VPS
        bot.sendMessage(msg.chat.id, 'Server sedang direstart...');
    }
});

// Jalankan server web untuk game HTML
app.use(express.static('public'));
app.listen(port, () => {
    console.log(`Server web berjalan di http://localhost:${port}`);
});
