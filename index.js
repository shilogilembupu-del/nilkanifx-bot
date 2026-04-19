const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Usanidi wa Puppeteer kwa ajili ya Render (Docker)
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        // Hii ndio njia ya Chrome ndani ya Docker image tuliyoweka
        executablePath: '/usr/bin/google-chrome-stable',
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // Hii inasaidia kupunguza RAM
            '--disable-gpu'
        ],
    }
});

// Kutengeneza QR Code kwenye Logs
client.on('qr', (qr) => {
    console.log('--- SCAN QR CODE HAPA CHINI ---');
    qrcode.generate(qr, { small: true });
});

// Bot ikishafanikiwa kuunganishwa
client.on('ready', () => {
    console.log('Bot ipo tayari! Nilkanifx-Bot is Live!');
});

// Mfano wa jibu la bot (Unaweza kuongeza kodi zako hapa chini)
client.on('message', message => {
    if (message.body.toLowerCase() === 'habari') {
        message.reply('Habari! Karibu Nilkanifx. Nitakusaidia vipi leo?');
    }
});

client.initialize();
