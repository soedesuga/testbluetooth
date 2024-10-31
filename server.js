const https = require('https');
const fs = require('fs');
const path = require('path');

const options = {
  key: fs.readFileSync(path.join(__dirname, 'server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'server.crt'))
};

https.createServer(options, (req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    // index.htmlを読み込んで返す
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading file.');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Page not found.');
  }
}).listen(3000, () => {
  console.log('HTTPS Server running on https://localhost:3000');
});
