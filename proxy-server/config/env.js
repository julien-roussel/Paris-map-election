const dotenv = require('dotenv');
dotenv.config();

const ENV = {
    PORT:           process.env.PORT,
    DB_NAME:        process.env.DB_NAME,
    MONGO_URI:      process.env.MONGO_URI,
    MONGO_URI_LOCAL:process.env.MONGO_URI_LOCAL,
    TOKEN:          process.env.TOKEN,
}

module.exports = ENV;