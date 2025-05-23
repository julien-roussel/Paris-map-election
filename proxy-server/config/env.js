const dotenv = require('dotenv');
dotenv.config();

const ENV = {
    PORT:           process.env.PORT,
    DOMAIN_APP_FRONT: process.env.DOMAIN_APP_FRONT,
    DOMAIN_APP_BACK: process.env.DOMAIN_APP_BACK,
    DB_NAME:        process.env.DB_NAME,
    MONGO_URI:      process.env.MONGO_URI,
    MONGO_URI_LOCAL:process.env.MONGO_URI_LOCAL,
    TOKEN:          process.env.TOKEN,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
}

module.exports = ENV;