const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

// 1. Seva ya Express kuzuia Render isizime bot
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Nilkanifx Bot is Active and Running!');
});

app.listen(port, () => {
    console.log(`[SYSTEM] Seva inasikiliza kwenye port ${port}`);
});

// 2. Usanidi wa Puppeteer uliokazwa (Dawa ya RAM ndogo)
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: '/usr/bin/google-chrome-stable',
        headless: true,
        protocolTimeout: 0, // Muhimu kuzuia timeout ya haraka
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--no-zygote',
            '--single-process', // Inapunguza matumizi ya RAM
            '--disable-gpu'
        ],
    }
});

// 3. QR Code Event
client.on('qr', (qr) => {
    console.log('[ACTION] SCAN QR CODE HAPA CHINI:');
    qrcode.generate(qr, { small: true });
});

// 4. Bot ikiwa tayari
client.on('ready', () => {
    console.log('[SUCCESS] Nilkanifx-Bot ipo tayari sasa hivi!');
});

// 5. Mfano wa Message
client.on('message', message => {
    if (message.body.toLowerCase() === 'mambo') {
        message.reply('Safi! Karibu Nilkanifx. Bot inafanya kazi vizuri.');
    }
});

// 6. DAWA YA MWISHO: Kusubiri dakika 1 (Sekunde 60)
console.log('[WAIT] Bot inajipanga... Tafadhali subiri DAKIKA 1 kamili ili Chrome itulie...');
setTimeout(() => {
    console.log('[START] Tunajaribu kuanzisha bot sasa...');
    client.initialize().catch(err => {
        console.error('[ERROR] Imefeli kuanza:', err.message);
        // Jaribio la pili ikiwa itafeli mara ya kwanza
        setTimeout(() => {
            console.log('[RETRY] Tunajaribu tena kuanzisha bot mara ya pili...');
            client.initialize();
        }, 10000);
    });
}, 60000); // Sekunde 60 za kusubiri
