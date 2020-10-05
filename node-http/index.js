const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost'

const port = 3000;

const server = http.createServer((req,res)=>{
    console.log(req.url+' by method'+req.method);

    if(req.method == 'GET')
    {
        var fileUrl;
        if(req.url=='/') fileUrl='/index.html';
        else fileUrl= req.url;

        var filePath = path.resolve('./public'+fileUrl);
        const fileExt = path.extname(filePath);
        if(fileExt == '.html')
        {
            fs.exists(filePath, (exists)=>{
                if(!exists)
                {
                    res.statusCode = 404;
                    res.setHeader('Content-Type','text/html');
                    res.end("<html> 404 file not found </html>");
                    return;
                }

                res.statusCode = 200;
                res.setHeader('Content-Type','text/html');
                fs.createReadStream(filePath).pipe(res);
            })
        }
        else{
            res.statusCode = 404;
            res.setHeader('Content-Type','text/html');
            res.end("<html> 404 file not html </html>");
            return;
        }
    }
    else{
            res.statusCode = 404;
            res.setHeader('Content-Type','text/html');
            res.end("<html> 404 only get allowed </html>");
            return;
    }

    //console.log(res);
})

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});