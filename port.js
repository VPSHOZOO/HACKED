const dgram = require('dgram');
const { exec } = require('child_process');


function executeVpsCommand(command, chatId) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            bot.sendMessage(chatId, `Error: ${error.message}`);
            return;
        }
        if (stderr) {
            bot.sendMessage(chatId, `Stderr: ${stderr}`);
            return;
        }
        bot.sendMessage(chatId, `Output:\n${stdout}`);
    });
}

// UDP Server untuk game
const udpServer = dgram.createSocket('udp4');
udpServer.on('message', (msg, rinfo) => {
    console.log(`UDP message from ${rinfo.address}:${rinfo.port}: ${msg}`);
    // Proses pesan game di sini
});

udpServer.bind(1234, () => {
    console.log('UDP server listening on port 1234');
});

// Tambahkan handler callback untuk VPS tools
bot.on('callback_query', (callbackQuery) => {
    const msg = callbackQuery.message;
    const data = callbackQuery.data;
    const chatId = msg.chat.id;
    
    if (data === 'restart_vps') {
        executeVpsCommand('sudo reboot', chatId);
    } else if (data === 'check_ping') {
        executeVpsCommand('ping -c 4 google.com', chatId);
    } else if (data === 'file_manager') {
        bot.sendMessage(chatId, 'Fitur file manager akan datang!');
    }
});

// ... (kode sebelumnya)
