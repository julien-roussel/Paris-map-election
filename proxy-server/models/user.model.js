const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username:{
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
        role:{
            type: String,
            enum: ['user', 'admin', 'superAdmin'],
            default: 'user',
        },
        isActive:{
            type: Boolean,
            default: true,
        },
        isVerified:{
            type: Boolean,
            default: true,
        },
        } ,  { timestamps: { createdAt: true    }
    }
)

module.exports = mongoose.model('Users', userSchema)