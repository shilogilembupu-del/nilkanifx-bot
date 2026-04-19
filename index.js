const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Seva ya uongo ili kuzuia Render isizime bot (Fix kwa "No open ports detected")
app.get('/', (req, res) => {
    res.send('Nilkanifx Bot is running!');
});

app.listen(port, () => {
    console.log(`Seva inasikiliza kwenye port ${port}`);
});

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: '/usr/bin/google-chrome-stable', // Njia sahihi ya Docker
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ],
    }
});

// QR Code itatokea hapa kwenye Logs
client.on('qr', (qr) => {
    console.log('--- SCAN QR CODE HAPA CHINI ---');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot ipo tayari! Nilkanifx-Bot is Live!');
});

// Tunaipa bot sekunde 30 kujiandaa ili kuzuia kosa la "Too early"
console.log('Bot inajipanga... Tafadhali subiri sekunde 30...');
setTimeout(() => {
    client.initialize().catch(err => console.error('Kuna shida kuanzisha bot:', err));
}, 30000);
