const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// HII NI DAWA YA RENDER: Seva ya uongo ili wasizime bot
app.get('/', (req, res) => {
    res.send('Nilkanifx Bot ipo hai!');
});

app.listen(port, () => {
    console.log(`Seva inasikiliza kwenye port ${port}`);
});

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
            '--single-process',
            '--disable-gpu'
        ],
    }
});

client.on('qr', (qr) => {
    // Hii itachapa QR code kama text ndefu kwenye logs
    console.log('SCAN QR HAPA:', qr);
});

client.on('ready', () => {
    console.log('Bot ipo tayari kabisa!');
});

// Tunaipa bot muda kidogo ijiandae
console.log('Bot inajipanga... Tafadhali subiri sekunde 30...');
setTimeout(() => {
    client.initialize().catch(err => console.error('Kuna shida kuanzisha bot:', err));
}, 30000);
