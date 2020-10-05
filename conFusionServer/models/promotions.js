const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const promotionSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    label:{
        type:String,
        required:true
    },
    price:{
        type:String
    },
    description:{
        type:String
    },
    featured:{
        type:Number,
        default:false
    }
},{timestamps:true});

var leaders = mongoose.model('promotion',promotionSchema);

module.exports=leaders;

