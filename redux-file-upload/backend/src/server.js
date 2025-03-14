const express = require('express');
const { getSignedPutUrl } = require('./services/S3Service');
const { Database } = require('./services/DBService');

const server = express();

const db = new Database(process.env.REDIS_URL, process.env.REDIS_CLIENT_NAME);

server.use(express.json());

// set routes

async function generateHook(filename) {
    const hookId = await db.createNewHook(filename);
    const hook = `http://localhost:${process.env.HTTP_PORT}/callback/${hookId}`;
    return hook;
}

server.post('/upload/link', async (req, res) => {
    const { filename, filetype } = req.body;
    if (!filename || !filetype) {
        return res.status(400).json({ message: "both 'filename' and 'filetype' are required" });
    }
    const url = await getSignedPutUrl(filename, filetype);
    const hook = await generateHook(filename);

    res.json({ url, hook });
});

server.get('/upload/callback/:hookId', async (req,res) => {
    const { hookId } = req.params;
    console.log(`upload web hook triggered hookId=${hookId}`);
    await db.removeHook(hookId);
    res.sendStatus(200);
});

// connect and listen

db.connect()
.then(() => {
    console.log('database connected successfully');

    server.listen(process.env.HTTP_PORT, () => console.log('listening of 3000'));
})
.catch( err => {
    console.log('unnable to connect to database', err);
})
