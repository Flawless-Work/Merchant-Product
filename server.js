var http = require('http');
var url = require('url');
var fs = require('fs');
var templater = require('./templater');
var port = process.env.PORT || 5000;

// Format using an object hash with keys matching [0-9a-zA-Z]+
var configContent = fs.readFileSync('config.json', 'utf8');

console.log(configContent)

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

    templater(configContent, urlPathname, urlParams, function(configRead) {
      response.write(configRead);
      response.end();
    });
}




http.createServer(onRequest).listen(port, console.log("Hello, listening to port" + port)    );
