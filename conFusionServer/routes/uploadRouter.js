const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/images');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});

const imageFileFilter = (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
    {
        return cb(new Error("you can uplaod only image files"));
    }
    else{
        return cb(null, true);
    }
}

const uplaod = multer({storage:storage,fileFilter:imageFileFilter})

const uploadRouter = express.Router();

var auth = require("../authenticate");
 
uploadRouter.use( bodyParser.json() );

uploadRouter.route('/')
.get(auth.verifyUser,auth.verifyAdmin,(req,res,next)=>{
    res.statusCode = 403;
    res.end("put operation not supported on image uplaod");
})
.put(auth.verifyUser,auth.verifyAdmin,(req,res,next)=>{
    res.statusCode = 403;
    res.end("put operation not supported on image uplaod");
})
.put(auth.verifyUser,auth.verifyAdmin,(req,res,next)=>{
    res.statusCode = 403;
    res.end("put operation not supported on image uplaod");
})
.post(auth.verifyUser,auth.verifyAdmin,uplaod.single('imageFile'),(req,res)=>{
    res.statusCode =200;
    res.setHeader("content-Type",'application/json');
    res.json(req.file);
})

module.exports = uploadRouter;

