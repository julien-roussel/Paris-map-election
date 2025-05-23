const nodemailer = require('nodemailer');
const ENV = require('../config/env')

const transporter = nodemailer.createTransport({
    // Configuration du serveur SMTP de Gmail
    host:'smtp.gmail.com',
    port: 587, 
    secure: false, // Pour le protocole SSL qui est obsolète
    auth: {
        user: ENV.EMAIL_USER,
        pass: ENV.EMAIL_PASS,
    }
});

const sendEmail = async (user, verifyToken) => {
    verificationLink = `<a href='${ENV.DOMAIN_APP_FRONT}/verify/${verifyToken}'>Vérifier votre mail</a>`
    console.log("Envoi de mail via Nodemailer", user.email)

    try {
        await transporter.sendMail({
            from: ENV.EMAIL_USER,
            to: user.email,
            subject: "Inscription SuffraMap - Vérifier votre mail",
            html: ` <h1>Hello ${user.username},</h1><br/>
                    <p>Merci de vous être inscrit.</p>
                    <p>Il reste une dernière étape pour valider votre inscription sur SuffraMap :</p>
                    <p>Cliquez sur ce lien pour vérifier votre email : ${verificationLink} </p>
                    <p>Cordialement.</p>
            `,
        }) 
    console.log("Mail envoyé à", user.email)
    } catch (err) {
        console.error("Erreur d'envoi d'email :", err)
    }
}

module.exports = sendEmail;