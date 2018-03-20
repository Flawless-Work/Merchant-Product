var fs = require('fs');
var format = require("string-template");

module.exports = function templater(configContent, urlPathname, urlParams, callback){
  fs.readFile(__dirname + urlPathname, function(err, data) {
    if (err){
       console.log(err);
    }
    var configurationObj = JSON.parse(configContent);
    configRead = format(data.toString(),
                        Object.assign({}, configurationObj, urlParams));

    callback(configRead)
  })
};
