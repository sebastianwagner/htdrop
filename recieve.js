/**
 * @see http://nodeguide.com/beginner.html#a-hello-world-http-server
 */
var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('<form method="post"><input type="file"><input type="submit"></form>');
});
server.listen(8080);
