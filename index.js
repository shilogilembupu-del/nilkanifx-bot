const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot Active!'));
app.listen(port, () => console.log(`Server on port ${port}`));

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: '/usr/bin/google-chrome-stable',
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu',
            '--disable-extensions'
        ],
    }
});

client.on('qr', (qr) => {
    console.log('--- QR IKO TAYARI! SCAN SASA ---');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => console.log('BOT IKO LIVE!'));

// BADALA YA DAKIKA 1, TUNATUMIA NJIA YA KUJARIBU (RETRY)
console.log('Inaanza kujiandaa...');
client.initialize().catch(err => {
    console.log('Jaribio la kwanza limefeli, tunarudia...');
    client.initialize();
});
