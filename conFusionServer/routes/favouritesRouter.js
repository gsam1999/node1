const express = require('express');
const bodyParser = require('body-parser');

const Favourites = require('../models/favorite');

const favouritesRouter = express.Router();
const cors = require('./cors');

var auth = require("../authenticate");
 
favouritesRouter.use( bodyParser.json() );

favouritesRouter.route('/')
.get(cors.cors,auth.verifyUser,(req,res,next)=>{
    let query = {'user':req.user._id};
    //console.log(query)
    Favourites.findOne(query)
    .populate('user')
    .populate('dishes.dish')
    .then((favourites)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(favourites);
    },err=>{
        next(err)
    })
    .catch((err)=>{
        next(err)
    })
    
})
.post(cors.cors,auth.verifyUser,(req,res,next)=>{

    let vals = [];

    if(Array.isArray(req.body))
    {
        vals = req.body
    }
    else{
        vals = [req.body]
    }

    Favourites.findOne({'user':req.user._id})    
    .then((favourites)=>{
        if(!favourites)
        {            
            Favourites.create({'user':req.user._id}).then(favourites=>{
                vals.forEach(element => {                                                    
                        favourites.dishes.push(element._id)                
                });
                
                favourites.save().then((favourite)=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json(favourite);}
                ,err=>next(err))
            },err=>next(err))
        }
        else
        {
            vals.forEach(element => {
                //console.log(favourites.dishes.id(element._id))
                if(!favourites.dishes.id(element._id))
                {                   
                    favourites.dishes.push(element._id)
                }
            });
            
            favourites.save().then((favourite)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(favourite);}
            ,err=>next(err))
        }
    }
    ,err=>next(err))
    .catch((err)=>next(err))
    
})
.delete(cors.cors,auth.verifyUser,(req,res,next)=>{
    let query = {'user':req.user._id};    
    Favourites.findOneAndDelete(query)    
    .then((favourites)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(favourites);
    },err=>{
        next(err)
    })
    .catch((err)=>{
        next(err)
    })
    
});

favouritesRouter.route('/:dishid')
.post(cors.cors,auth.verifyUser,(req,res,next)=>{
    Favourites.findOne({'user':req.user._id})    
    .then((favourites)=>{
        if(!favourites)
        {           
            Favourites.create({'user':req.user._id}).then(favourites=>{                                                               
                        favourites.dishes.push(req.params.dishid)                
                
                favourites.save().then((favourite)=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json(favourite);}
                ,err=>next(err))
            },err=>next(err))
        }
        else
        {   
            if(!favourites.dishes.id(req.params.dishid))         
            {
                favourites.dishes.push(req.params.dishid)
                favourites.save().then((favourite)=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json(favourite);}
                ,err=>next(err))
            }
            else{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(favourites);
            }
        }
    }
    ,err=>next(err))
    .catch((err)=>next(err))

})
.delete(cors.cors,auth.verifyUser,(req,res,next)=>{
    let query = {'user':req.user._id};    
    Favourites.findOne(query)    
    .then((favourites)=>{
        if(favourites.dishes.id(req.params.dishid))
        {
        favourites.dishes.id(req.params.dishid).remove();
        }
        
        favourites.save().then((favourites)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(favourites);
        });        
    },err=>{
        next(err)
    })
    .catch((err)=>{
        next(err)
    })
});

module.exports = favouritesRouter;