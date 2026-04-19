const { Client, LocalAuth } = require('whatsapp-web.js');

// Usanidi wa Puppeteer uliorekebishwa kwa ajili ya Render
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: '/usr/bin/google-chrome-stable',
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--no-zygote',
            '--single-process', // Inasaidia sana seva zenye RAM ndogo
            '--disable-gpu'
        ],
    }
});

// QR Code itatokea hapa kwenye Logs
client.on('qr', (qr) => {
    console.log('SCAN QR HAPA:', qr);
});

// Bot ikishakubali
client.on('ready', () => {
    console.log('Nilkanifx-Bot ipo LIVE sasa hivi!');
});

// Mfano wa jibu (Reply)
client.on('message', message => {
    if (message.body.toLowerCase() === 'mambo') {
        message.reply('Safi! Karibu Nilkanifx Trading Bot.');
    }
});

// HAPA NDIO DAWA: Tunaipa bot sekunde 30 ijiandae kabla ya kuwaka
console.log('Bot inajipanga... Tafadhali subiri sekunde 30...');
setTimeout(() => {
    client.initialize().catch(err => console.error('Kuna shida kuanzisha bot:', err));
}, 30000);
