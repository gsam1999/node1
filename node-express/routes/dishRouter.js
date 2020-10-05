const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
 
dishRouter.use( bodyParser.json() );

dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{

    res.end("will send all the dishes to you");
})
.post((req,res,next)=>{

    res.end("will add the dishes : "+req.body.name + ' with details: ' + req.body.description );
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end("put operation not supported on dishes");
})
.delete((req,res,next)=>{
    res.end(" Deleting all dishes");
});

dishRouter.route('/:dishid')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
    
})
.get((req,res,next)=>{
    res.end('will send'+ req.params.dishid );
})
.post((req,res,next)=>{
    res.statuscode = 403;
    res.end(" POST is not supported on dishes/dishid ");
})
.put((req,res,next)=>{
    res.write(" will update dish"+req.params.dishid );
    res.end('will upadste dish' + req.body.name+"with details"+
    req.body.description );
})
.delete((req,res,next)=>{
    res.end("will delete"+req.params.dishid);
});

module.exports = dishRouter;