/**
 * @see http://nodeguide.com/beginner.html#a-hello-world-http-server
 */
var http = require('http');

function leForm(res) {
 res.writeHead(200);
 res.end('<!DOCTYPE html>' + "\n" + '<form method="post"><input type="file" name="filez" multiple required><input type="submit"></form>');
}

var server = http.createServer(function(req, res) {
  switch(req.method) {
    case 'POST':
     req.on('data', function(data){
      console.log(data);
      console.log('we gotz data!');
     }).on('end', function(end){
      console.log('omg the end is nea..');
      leForm(res);
     });
     
     break;
    default:
     leForm(res);
  }
});
server.listen(8080);
