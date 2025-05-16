const mongoose = require("mongoose");

const connectMongoDB = (mongoURI, dbName) => {
    mongoose   
        .connect(mongoURI, {dbName: dbName})
        .then(() => console.log('Connexion à mongo réussi'))
        .catch(error => console.log('Connexion à mongo échoué', error))
}

module.exports = connectMongoDB;