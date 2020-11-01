var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors')
var User = require('../models/user');

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin ,function(req, res, next) {

  User.find({}).then((users)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(users);
  })
  .catch((err)=>{
    next(err);
  })
});


router.post('/signup',cors.corsWithOptions,function(req,res,next){
  //console.log("inside");
  User.register(new User({username:req.body.username}),
  req.body.password,(err,user)=>{
    if(err)
    {
      res.statusCode = 500;
      res.setHeader('Content-Type','application/json');
      res.json({err:err});
    }
    else{
      if(req.body.firstname)
        user.firstname = req.body.firstname
      if(req.body.lastname)
        user.lastname = req.body.lastname

      user.save((err,user)=>{
        if(err)
        { 
          res.statusCode = 500;
          res.setHeader('Content-Type','application/json');
          res.json({err:err});
        }
        passport.authenticate('local')(req,res,()=>{
          res.statusCode = 200;
          res.setHeader('Content-Type','application/json');
          res.json({success:'true',status:'registration successful'})
        });
      })     
    }
  });
});

router.post('/login', cors.corsWithOptions,passport.authenticate('local'), (req,res,next)=>{

  var token = authenticate.getToken({_id:req.user._id});

  res.statusCode = 200;
  res.setHeader('Content-Type','application/json');
  res.json({success:'true',status:'login successful',token:token})


})

router.get('/logout',(req,res,next)=>{
  if(req.session)
  {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else{
    let err = new Error("user not logged in");
    err.status = 403;
    return (next(err));
  }

})

router.get('/facebook/token',passport.authenticate('facebook-token'),(req,res)=>{
  if(req.user)
  {
    var token = authenticate.getToken({_id:req.user._id});

    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json({success:'true',status:'login successful',token:token})
  }
})


module.exports = router;
