const express = require('express');

const bodyParser = require('body-parser');

const Leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use( bodyParser.json());

let auth = require('../authenticate');


leaderRouter.route('/')
.get((req,res,next) =>{
    Leaders.find({})
    .then((leaders)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
    },err=>next(err))
    .catch((err)=>{
        next(err);
    })

})
.post(auth.verifyUser,(req,res,next) =>{
    Leaders.create(req.body)
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },err=>next(err))
    .catch((err)=>{
        next(err);
    })
})
.put(auth.verifyUser,(req,res,next) =>{
    res.statusCode = 403;
    res.end('put is not supported on leadertions');
})
.delete(auth.verifyUser,(req,res,next) =>{
    Leaders.remove({})
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },err=>next(err))
    .catch((err)=>{
        next(err);
    })
});

leaderRouter.route('/:leaderid')
.get((req,res,next)=>{
    Leaders.findById(req.params.leaderid)
    .then((leaders)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
    },err=>next(err))
    .catch((err)=>{
        next(err);
    })
})
.post(auth.verifyUser,(req,res,next)=>{
    res.statuscode = 403;
    res.end(" POST is not supported on leaderes/leaderid ");
})
.put(auth.verifyUser,(req,res,next)=>{
    Leaders.findByIdAndUpdate(req.params.leaderid,{
        $set:req.body
    },{new:true})
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },err=>next(err))
    .catch((err)=>{
        next(err);
    })
})
.delete(auth.verifyUser,(req,res,next)=>{
    Leaders.findByIdAndDelete(req.params.leaderid)
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },err=>next(err))
    .catch((err)=>{
        next(err);
    })
});


module.exports = leaderRouter;