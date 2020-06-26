const mongoose = require('mongoose')
const validator = require('validator')

const User  = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate( value ) {
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email")
            }
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password'))
            {
                throw new Error("Password cannot contain password")
            }
        }
    },

    age: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if(value < 0)
            {
                throw new Error("Age cannot be less than 0")
            }
        }
    }
})

module.exports = User