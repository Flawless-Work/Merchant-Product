const assert = require('chai').assert;
const templater = require('./templater');
var fs = require('fs');

describe('App', function(){
  it('app should return hello', function(done){

    templater(JSON.stringify({"companyname":"Motovrdsdsoooom"}), '/test.html', {}, function(configRead){
      console.log(configRead);
      assert.equal(configRead, "<title>Motovrdsdsoooom</title>\n");
      done();
    })

  });
})
