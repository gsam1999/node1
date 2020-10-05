const express = require('express');

const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use( bodyParser.json());


leaderRouter.route('/')
leaderRouter.route('/')
.all((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain'); 
    next();
})
.get((req,res,next) =>{
    res.end("sending all leadertions");
})
.post((req,res,next) =>{
    res.end( " will add leadertion "+req.body.name+" with desc "+ 
    req.body.description);
})
.put((req,res,next) =>{
    res.statusCode = 403;
    res.end('put is not supported on leadertions');
})
.delete((req,res,next) =>{
    res.end('deleting all leadertions');
});

leaderRouter.route('/:leaderid')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
    
})
.get((req,res,next)=>{
    res.end('will send'+ req.params.leaderid );
})
.post((req,res,next)=>{
    res.statuscode = 403;
    res.end(" POST is not supported on leaderes/leaderid ");
})
.put((req,res,next)=>{
    res.write(" will update leader"+req.params.leaderid );
    res.end('will upadste leader' + req.body.name+"with details"+
    req.body.description );
})
.delete((req,res,next)=>{
    res.end("will delete"+req.params.leaderid);
});


module.exports = leaderRouter;