const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    }
});

async function getSignedPutUrl(filename, filetype) {
    const options = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: filename,
        ContentType: filetype,
    };

    const cmd = new PutObjectCommand(options);
    const url = await getSignedUrl(client,cmd);
    return url;
}

module.exports = {
    getSignedPutUrl, 
}