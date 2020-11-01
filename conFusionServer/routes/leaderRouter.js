const express = require('express');

const bodyParser = require('body-parser');

const Leaders = require('../models/leaders');

const leaderRouter = express.Router();
const cors = require('./cors')

leaderRouter.use( bodyParser.json());

let auth = require('../authenticate');


leaderRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.get(cors.cors,(req,res,next) =>{
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
.post(cors.corsWithOptions,auth.verifyUser,(req,res,next) =>{
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
.put(cors.corsWithOptions,auth.verifyUser,(req,res,next) =>{
    res.statusCode = 403;
    res.end('put is not supported on leadertions');
})
.delete(cors.corsWithOptions,auth.verifyUser,(req,res,next) =>{
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
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.get(cors.cors,(req,res,next)=>{
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
.post(cors.corsWithOptions,auth.verifyUser,(req,res,next)=>{
    res.statuscode = 403;
    res.end(" POST is not supported on leaderes/leaderid ");
})
.put(cors.corsWithOptions,auth.verifyUser,(req,res,next)=>{
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
.delete(cors.corsWithOptions,auth.verifyUser,(req,res,next)=>{
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