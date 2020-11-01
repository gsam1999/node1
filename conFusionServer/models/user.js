var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
const { facebook } = require('../config');

var User = new Schema({

    firstname:{
        type:String,
        default:''
    },
    lastname:{
        type:String,
        default:''
    },
    admin:{
        type:Boolean,
        default:false
    },
    facebookId:String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',User);