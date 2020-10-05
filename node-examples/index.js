var rect = require('./rectangle');

function solveRect(l,b){

    console.log("l = "+l+" b = "+b);
   
    rect(l,b,(err,rectangle)=>{
        if(err)
        {
            console.log("error = "+err.message);
        }
        else{
            console.log(" area = " +rectangle.area());
            console.log(" perimeter = " +rectangle.perimeter());
        }
    });

    console.log("this statement is after completion");


}

solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-3,5);