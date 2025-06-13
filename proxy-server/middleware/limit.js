const rateLimit = require("express-rate-limit");

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // max 5 requêtes par IP
    message: {
        error: "Trop de requêtes. Veuillez réessayer plus tard."
    },
});

module.exports = contactLimiter