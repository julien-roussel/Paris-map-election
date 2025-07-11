const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username:{
            type: String,
            minLenght: 3,
            maxLenght: 30,
            required: true,
            match: [/^[a-zA-Z0-9_]+$/, "Le nom d'utilisateur ne doit contenir que des lettres, chiffres et underscores (pas d'espaces ni caractères spéciaux)."]
        },
        firstname:{
            type: String,
            minLenght: 3,
            maxLenght: 30,
            required: true
        },
        lastname:{
            type: String,
            minLenght: 3,
            maxLenght: 30,
            required: true
        },
        email:{
            type: String,
            unique: true,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true,
            trim: true,
            validate: {
                validator: (v) => {
                    const minDate = new Date('1900-01-01');
                    const maxDate = new Date();
                    return v >= minDate && v <= maxDate;
                },
                message: props => `Date invalide : ${props.value}`
            }
        },
        city:{
            type: String,
            required: true
        },
        profession:{
            type: String,
            required: false
        },
        role:{
            type: String,
            enum: ['user', 'subscriber', 'admin', 'superAdmin'],
            default: 'user',
        },
        isActive:{
            type: Boolean,
            default: true,
        },
        isVerified:{
            type: Boolean,
            default: false,
        },
        isSuscriber:{
            type: Boolean,
            default: false,
        },
        } ,  { timestamps: { createdAt: true    }
    }
)

module.exports = mongoose.model('Users', userSchema)