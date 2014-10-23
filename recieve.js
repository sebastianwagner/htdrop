/**
 * @see http://nodeguide.com/beginner.html#a-hello-world-http-server
 */
var http = require('http'),
formidable = require('formidable'),
util = require('util'),
      qs = require('querystring');

function leForm(res, timeout) {
 res.setHeader("Cache-Control", 'max-age=' + 1 * 60 * 60 + ', public');
 res.setHeader("Keep-Alive", 'timeout=' + timeout);
 res.setHeader("Content-Type", 'text/html; charset=utf-8');
 res.writeHead(200);
 res.end('<!DOCTYPE html>' + "\n" + '<form method="post" action="?upload" enctype="multipart/form-data"><input type="file" name="filez" multiple required><input type="submit"></form>');
}

function leLink(res) {
    res.setHeader("Connection", 'close');
    res.setHeader("Cache-Control", 'max-age=' + 1 * 60 * 60+ ', public');
    res.setHeader("Content-Type", 'text/html; charset=utf-8');
    res.writeHead(200);
    res.write('<!DOCTYPE html>' + "\n" + '<a href="/">upload</a>');
    //res.end(util.inspect({fields: fields, files: files}));
    //close TCP-connection proactively
    res.connection.end();
}

var server = http.createServer(function(req, res) {
  var timeout = this.timeout / 1000;
  switch(req.method) {
    case 'POST':
     var form = new formidable.IncomingForm();
     form.parse(req, function(err, fields, files) {
      leLink(res);
     });
     var weGotData = false, body = '';
     break;
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
      leForm(res, timeout);
     });
     break;
    default:
     leForm(res, timeout);
  }
});
var instance = server.listen(8080);

