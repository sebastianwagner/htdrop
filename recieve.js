/**
 * @see http://nodeguide.com/beginner.html#a-hello-world-http-server
 */
var http = require('http'),
      qs = require('querystring');

function leForm(res) {
 res.writeHead(200);
 res.end('<!DOCTYPE html>' + "\n" + '<form method="post"><input type="file" name="filez" multiple required><input type="submit"></form>');
}

var server = http.createServer(function(req, res) {
  switch(req.method) {
    case 'POST':
     var weGotData = false, body = '';
     req.once('data', function(chunk){
      weGotData = true;
      body += chunk;
     }).on('end', function(end){
      console.log(weGotData? 'weGotData' : 'omg the end is nea..');
      if(body) {
        /** @see https://stackoverflow.com/a/4310087 */
        var post = qs.parse(body);
        console.log(post);
      }
      leForm(res);
     });
     break;
    default:
     leForm(res);
  }
});
server.listen(8080);
