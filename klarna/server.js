var http = require('http');
var url = require('url');
var fs = require('fs');
var format = require("string-template");
var configRead
 
// Format using an object hash with keys matching [0-9a-zA-Z]+ 
var content = fs.readFileSync('config.json', 'utf8');    
var contentString = content.toString();
var configurationObj = JSON.parse(contentString);

function onRequest(req, response) {
    if (req.url == '/favicon.ico') {
        response.end();
        return
    }
    
    var urlParts = url.parse(req.url, true),
    urlParams = urlParts.query, 
    urlPathname = urlParts.pathname;
    console.log(urlPathname);
    console.log(urlParams);
    if (urlPathname === '/') {
        urlPathname = '/index.html'
    }
    response.writeHead(200, {'Content-Type': 'text/html'});
    
    fs.readFile(__dirname + urlPathname, function(err, data) {
        if (err){
             console.log(err);
         }

        configRead = format(data.toString(), 
                            Object.assign({}, configurationObj, urlParams));

        response.write(configRead);
        response.end();
    })
}

http.createServer(onRequest).listen(8000);