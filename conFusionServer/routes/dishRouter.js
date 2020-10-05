const express = require('express');
const bodyParser = require('body-parser');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();

var auth = require("../authenticate");
 
dishRouter.use( bodyParser.json() );

dishRouter.route('/')
.get(auth.verifyUser,(req,res,next)=>{
    Dishes.find({})
    .populate('comments.author')
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type',"application/json");
        //console.log(dish);
        res.json(dish);
    },(err)=>next(err))
    .catch((err)=>{ next(err)});
})
.post(auth.verifyUser,auth.verifyAdmin,(req,res,next)=>{
   Dishes.create(req.body)
   .then((dish)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type',"application/json");
    res.json(dish);
   },(err)=>next(err))
   .catch((err)=>{ next(err)});
})
.put(auth.verifyUser,auth.verifyAdmin,(req,res,next)=>{
    res.statusCode = 403;
    res.end("put operation not supported on dishes");
})
.delete(auth.verifyUser,auth.verifyAdmin,(req,res,next)=>{
    Dishes.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type',"application/json");
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>{ next(err)});                                                                            
});

dishRouter.route('/:dishid')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishid)
    .populate('comments.author')
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type',"application/json");
        res.json(dish);
    },(err)=>next(err))
    .catch((err)=>{ next(err)});    
})
.post(auth.verifyUser,auth.verifyAdmin,(req,res,next)=>{
    res.statuscode = 403;
    res.end(" POST is not supported on dishes/dishid ");
})
.put(auth.verifyUser,auth.verifyAdmin,(req,res,next)=>{
    Dishes.findByIdAndUpdate(req.params.dishid,{
        $set:req.body
    },{new:true})
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type',"application/json");
        res.json(dish);
    },(err)=>next(err))
    .catch((err)=>{ next(err)});   
})
.delete(auth.verifyUser,auth.verifyAdmin,(req,res,next)=>{
    Dishes.findByIdAndDelete(req.params.dishid)
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type',"application/json");
        res.json(dish);
    },(err)=>next(err))
    .catch((err)=>{ next(err)});   
});

dishRouter.route('/:dishid/comments')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishid)
    .populate('comments.author')
    .then((dish)=>{
        if(dish)
        {
            res.statusCode = 200;
            res.setHeader('Content-Type',"application/json");
            res.json(dish.comments);
        }
        else{
            err = new Error("dish not found");
            err.statusCode = 404;
            return next(err);
        }
    },(err)=>next(err))
    .catch((err)=>{ next(err)});    
})
.post(auth.verifyUser,(req,res,next)=>{
    Dishes.findById(req.params.dishid)
    .then((dish)=>{
        if(dish)
        {   
            req.body.author = req.user._id;
            dish.comments.push(req.body);
            dish.save()
            .then((dish)=>{
                Dishes.findById(dish._id).populate('comments.author')
                .then((dish)=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type',"application/json");
                    res.json(dish);
                })               
            })
            .catch((err)=>{
                err = new Error("dish update failed found");
                err.statusCode = 404;
                return next(err);
            })        
        }
        else{
            err = new Error("dish not found");
            err.statusCode = 404;
            return next(err);
        }    
    });
  
})
.put(auth.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end("put is not supported on dishid/comments");
})

.delete(auth.verifyUser,auth.verifyAdmin,(req,res,next)=>{
    Dishes.findById(req.params.dishid)
    .then((dish)=>{
        if(dish)
        {
            // for(var i = 0;i<dish.comments.length;i++)
            // {
            //     dish.comments.id(dish.comments[i]._id).remove();
            // }
            dish.comments = [];
            dish.save().then((dish1)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type',"application/json");
                res.json(dish1);
            })        
        }
        else{
            err = new Error("dish not found");
            err.statusCode = 404;
            return next(err);
        }   
    },(err)=>next(err))
    .catch((err)=>{ next(err)});   
});

dishRouter.route('/:dishid/comments/:commentid')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishid)
    .populate('comments.author')
    .then((dish)=>{
        if(dish && dish.comments.id(req.params.commentid))
        {
            res.statusCode = 200;
            res.setHeader('Content-Type',"application/json");
            res.json(dish.comments.id(req.params.commentid));
        }
        else if(!dish){
            err = new Error("dish not found");
            err.statusCode = 404;
            return next(err);
        }
        else{
            err = new Error("comment not found");
            err.statusCode = 404;
            return next(err);
        }
    },(err)=>next(err))
    .catch((err)=>{ next(err)});     
})
.post(auth.verifyUser,(req,res,next)=>{
    res.statuscode = 403;
    res.end(" POST is not supported on dishes/dishid ");
})
.put(auth.verifyUser,(req,res,next)=>{
    Dishes.findById(req.params.dishid)
    .then((dish)=>{
        if(!dish.comments.id(req.params.commentid).author.equals(req.user._id) )
        {
            console.log(dish.comments.id(req.params.commentid).author);
            console.log(req.user._id);
            let err = new Error(" Action not allowed");
            err.statusCode = 404;
            return next(err);
        }

        if(dish && dish.comments.id(req.params.commentid) )
        {   
            if(req.body.rating)
            {
                dish.comments.id(req.params.commentid).rating = req.body.rating;
            } 
            if(req.body.comment)
            {
                dish.comments.id(req.params.commentid).comment = req.body.comment;
            }
            dish.save().then((dish)=>{
                Dishes.findById(dish._id).populate('comments.author')
                .then((dish)=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type',"application/json");
                    res.json(dish.comments.id(req.params.commentid));
                })                
            })
        }
        else if(!dish){
            err = new Error("dish not found");
            err.statusCode = 404;
            return next(err);
        }
        else{
            err = new Error("comment not found");
            err.statusCode = 404;
            return next(err);
        }
    },(err)=>next(err))
    .catch((err)=>{ next(err)});     
})
.delete(auth.verifyUser,(req,res,next)=>{
    Dishes.findById(req.params.dishid)
    .then((dish)=>{
        if(!dish.comments.id(req.params.commentid).author.equals(req.user._id)  )
        {
            console.log(dish.comments.id(req.params.commentid));
            console.log(req.user);
            let err = new Error(" Action not allowed");
            err.statusCode = 404;
            return next(err);
        }
        if(dish && dish.comments.id(req.params.commentid))
        {
            dish.comments.id(req.params.commentid).remove();
            dish.save().then((dish)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type',"application/json");
                res.json(dish);
            });
        }
        else if(!dish){
            err = new Error("dish not found");
            err.statusCode = 404;
            return next(err);
        }
        else{
            err = new Error("comment not found");
            err.statusCode = 404;
            return next(err);
        }                     
    },(err)=>next(err))
    .catch((err)=>{ next(err)});   
});

module.exports = dishRouter;