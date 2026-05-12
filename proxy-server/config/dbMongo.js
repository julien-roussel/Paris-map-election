const mongoose = require("mongoose");

const connectMongoDB = (mongoHost, dbName, username, password) => {
    const fullMongoURI = `mongodb://${username}:${password}@${mongoHost}:27017/${dbName}`
    return mongoose   
        .connect(fullMongoURI, {dbName: dbName})
        .then(() => console.log('Connexion à mongo réussi'))
        .catch(error => console.log('Connexion à mongo échoué', error))
}

module.exports = connectMongoDB;