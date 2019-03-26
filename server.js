const http = require('http');
const fs = require('fs');

let qs = require('querystring');
let wp = '';
let jsFile = '';
let cssFile = '';

http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      file = fs.readFileSync('index.html');
      res.end(file);
      break;
    case '':
      res.writehead(200, {
        'Content-Type': 'text/css'
      });
      fs.readFile('css/style.css', (err, data) => {
        if (err) throw err;
        cssFile = data;
      });
      res.end(cssFile);
      break;
    case '/index.js':
      fs.readFile('script/bundle.js', (err, data) => {
        if (err) throw err;
        jsFile = data;
      });
      res.writeHead(200, {
        'Content-Type': 'text/javascript'
      });
      res.end(jsFile);
      break;
    case '/Home.html':
      if (req.method == 'POST') {
        let body = '';
        req.on('data', function (data) {
          bode += data;
          if (body > 1e6) req.connection.destroy();
        });
        req.on('end', function () {
          let post = qs.parse(body);
          wp = "document.write('Welcome " + post['name'] + "!')";
        });
      };
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      file = fs.readFileSync('Home.html');
      res.end(file);
      break;
    case 'script/neBundle.js':
      res.writeHead(200, {
        'Content_Type': 'text/js'
      });
      res.end(wp);
      break;
    default:
      res.writeHead(404, {
        'Content-Type': 'text/plain; charset=UTF-8'
      });
      res.end('404 not found');
  }
}).listen(3000, () => console.log('Server is working'));