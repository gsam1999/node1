const mongoose = require('mongoose');

const Dishes = require('./models/dishes');
const Comments = require('./models/dishes');

const url ="mongodb://localhost:27017/conFusion";

const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log("connected to the server");

    Dishes.create({
        name:"Upizza",
        description:"this si a testing gor"
    })
    .then((dish)=>{
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id,{
            $set:{description:"upsates desc testing"}
        },{
            new:true
        }).exec();
    })
    .then((dish)=>{
        console.log(dish);
        console.log("adding comments");
        dish.comment.push({
            rating:5,
            comment:" this dia test comment",
            author:"blah blah"
        });
        return dish.save();
    })
    .then((dishes)=>{
        console.log(dishes);
        console.log(" removing all dishes");
        return Dishes.remove({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err);
    })
}).catch((err)=>{
    console.log(err)
});