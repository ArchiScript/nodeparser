const express = require('express');
const { exec } = require('child_process');
const app = express();

const PORT = process.env.PORT || 8080;
const SECRET = process.env.WEBHOOK_SECRET;

app.use(express.json());

app.get('/test', (req, res) => {
    console.log('GET request received at /test');
    res.send('Webhook server is running!');
});

app.post('/deploy', (req, res) => {
    const signature = req.headers['x-hub-signature'];
    if (!SECRET || signature !== SECRET) {
        return res.status(401).send('Unauthorized');
    }

    console.log('[Webhook] Deploy triggered');

    exec('sh ./deploy.sh', (error, stdout, stderr) => {
        if (error) {
            console.error('[Deploy] Failed:', stderr);
            return res.status(500).send('Deploy failed');
        }

        console.log('[Deploy] Success:\n', stdout);
        res.send('Deploy successful');
    });
});

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Webhook server running on port ${PORT}`);
});
