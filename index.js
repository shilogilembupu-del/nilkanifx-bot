const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        handleSIGINT: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--single-process',
            '--no-zygote'
        ],
    }
});

client.on('qr', (qr) => {
    console.log('--- SCAN QR CODE HAPA CHINI ---');
    qrcode.generate(qr, {small: true});
    console.log('Kama picha haionekani vizuri, nakili hii text ya QR:');
    console.log(qr);
});

client.on('ready', () => {
    console.log('Hongera! NilkaniFX Bot ipo tayari!');
});

client.initialize();
