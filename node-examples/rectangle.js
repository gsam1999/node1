module.exports = (x,y,callback) =>{

    let exc = false;
    (x<=0 || y<=0) && (exc=true) && console.log('dimensions should not be zero');

    if(exc)
    {
       setTimeout(() => {
           callback(new Error("dimensions should not be zero")
                ,null)
       }, 2000);
    }
    else{
        console.log("inside rectangle");
        setTimeout(() => {
            callback( null, 
                {
                    perimeter:() => (2*(x+y)),
                    area: () => (x*y)
                })
        }, 2000);
    }

}




