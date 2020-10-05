const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');


const hostname = 'localhost';
const port = '3000'

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());



// app.all('/dishes',(req,res,next)=>{
//     res.statuscode = 200;
//     res.setHeader('Content-Type','text/plain');
//     next();
// });

// app.get('/dishes',(req,res,next)=>{
//     res.end('will send all diahes to you');
// });

// app.post('/dishes',(req,res,next)=>{
//     res.end("will add ther dish :"+req.body.name + 
//     req.body.description);
// });

// app.put('/dishes',(req,res,next)=>{
//     res.statuscode = 403;
//     res.end(" PUT is not supported on dishes ");
// });

// app.delete('/dishes',(req,res,next)=>{
//     res.end(" deleting all dishes ");
// });


// app.get('/dishes/:dishid',(req,res,next)=>{
//     res.end('will send'+ req.params.dishid );
// });

// app.post('/dishes/:dishid',(req,res,next)=>{
//     res.statuscode = 403;
//     res.end(" POST is not supported on dishes/dishid ");
// });

// app.put('/dishes/:dishid',(req,res,next)=>{
//     res.write(" will update dish"+req.params.dishid );
//     res.end('will upadste dish' + req.body.name+"with details"+
//     req.body.description );
// });

// app.delete('/dishes/:dishid',(req,res,next)=>{
//     res.end("will delete"+req.params.dishid);
// });

app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter)

app.use(express.static(__dirname+'/public'));


app.use( (req,res,next)=> {

    res.statuscode = 200;
    res.setHeader('Content-Type','text/html');
    res.end("<html> <h1>  this is express test </h1></html>");
});

const server = http.createServer(app);

server.listen(port,hostname,()=>{
    console.log(`server rinning at ${hostname}:${port}`)
})