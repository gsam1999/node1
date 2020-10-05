const express = require('express');

const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use( bodyParser.json());

promoRouter.route('/')
.all((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain'); 
    next();
})
.get((req,res,next) =>{
    res.end("sending all promotions");
})
.post((req,res,next) =>{
    res.end( " will add promotion "+req.body.name+" with desc "+ 
    req.body.description);
})
.put((req,res,next) =>{
    res.statusCode = 403;
    res.end('put is not supported on promotions');
})
.delete((req,res,next) =>{
    res.end('deleting all promotions');
});

promoRouter.route('/:promoid')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
    
})
.get((req,res,next)=>{
    res.end('will send'+ req.params.promoid );
})
.post((req,res,next)=>{
    res.statuscode = 403;
    res.end(" POST is not supported on promoes/promoid ");
})
.put((req,res,next)=>{
    res.write(" will update promo"+req.params.promoid );
    res.end('will upadste promo' + req.body.name+"with details"+
    req.body.description );
})
.delete((req,res,next)=>{
    res.end("will delete"+req.params.promoid);
});


module.exports = promoRouter;