const crypto = require('node:crypto');
const { createClient } = require('redis');

function generateRandomString() {
    const value = crypto.randomBytes(16).toString('base64url');
    return value;
}

class Database {

    constructor(url, name = '') {
        console.log(`Database: url=${url}, name=${name}`);
        this.redisUrl = url;
        this.redisClientName = name;
    }

    async connect() {
        const client = createClient({
            url: this.redisUrl,
            name: this.redisClientName || 'Redis Client',
        });
        
        await client.connect();
        this.redisClient = client;
    }

    async createNewHook(s3Key) {
        const client = this.redisClient;
        const hookId = generateRandomString();
        await client.set(hookId, s3Key, {
            EX: 900, // 15 minutes
        });
        return hookId;
    }

    async removeHook(hookId) {
        const client = this.redisClient;
        await client.del(hookId);
    }
}

module.exports = { 
    Database,
}