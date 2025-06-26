const express = require('express');
const connectMongoDB = require('./config/dbMongo');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const dirname = path.dirname(__filename);

const ENV = require('./config/env');
const app = express();

// IMPORT ROUTER
const elecRouter = require('./router/election.router')
const mapRouter = require('./router/map.router')
const userRouter = require('./router/user.router')
const contactRouter = require('./router/contact.router')


// CONNEXION MONGO
connectMongoDB(ENV.MONGO_URI, ENV.DB_NAME)

// MIDDLEWARES
app.use(cors({
    origin: ['http://localhost:5173', 'https://ton-projet.vercel.app'],
    credentials: true
}));
app.use('/uploads', express.static(path.join(dirname, 'uploads')));
app.use(express.json());
app.use(cookieParser());

// URLS API PREFIX
app.use("/api/elections", elecRouter)
app.use("/api/map", mapRouter)
app.use("/api/users", userRouter)
app.use("/api/contact", contactRouter)

// MIDDLEWARES DE GESTION D'ERROR
app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Une erreur est survenue"
    const details = error.details || null;

    res.status(status).json({
        error: {
            status, 
            message,
            details
        }
    })
})

module.exports = app;