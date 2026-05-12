const dotenv = require('dotenv');
dotenv.config();

const ENV = {
    HTTP_SERVER_PORT:  process.env.HTTP_SERVER_PORT,
    DOMAIN_APP_FRONT:  process.env.DOMAIN_APP_FRONT,
    DOMAIN_APP_BACK:   process.env.DOMAIN_APP_BACK,
    MONGO_DB_NAME:     process.env.MONGO_DB_NAME,
    MONGO_URI:         process.env.MONGO_URI,
    MONGO_URI_LOCAL:   process.env.MONGO_URI_LOCAL,
    MONGO_HOST:        process.env.MONGO_HOST,
    MONGO_USERNAME:    process.env.MONGO_USERNAME,
    MONGO_PASSWORD:    process.env.MONGO_PASSWORD,
    JWT_TOKEN:         process.env.JWT_TOKEN,
    EMAIL_SENDER_USER: process.env.EMAIL_SENDER_USER,
    EMAIL_SENDER_PASS: process.env.EMAIL_SENDER_PASS,
}

module.exports = ENV;