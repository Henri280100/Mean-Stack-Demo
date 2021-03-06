const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


let userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: "This field cannot be empty."
    },
    email: {
        type: String,
        required: "Email cannot be empty.",
        unique: true
    },
    password: {
        type: String,
        required: "Password cannot be empty.",
        minLength: [4, "Password must be at least 4 characters long"]
    },
    saltSecret: String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


//Event
userSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});
mongoose.model('User', userSchema);