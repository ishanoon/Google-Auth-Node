const Mongoose = require('mongoose');

const database = require('../configs/db');

UserSchema = Mongoose.Schema({
    idToken : {type:String},
    name : {type:String},
    email: {type:String}

})

module.exports = database.model('Users', UserSchema)