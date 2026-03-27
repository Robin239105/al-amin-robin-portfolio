const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, 'test_results.log');
const message = `[${new Date().toISOString()}] NODE TEST SUCCESSFUL\nNode Version: ${process.version}\nPlatform: ${process.platform}\nCWD: ${process.cwd()}\n`;

try {
  fs.writeFileSync(logPath, message);
  console.log('Test file created successfully');
} catch (err) {
  console.error('Failed to write test file:', err);
}

// Minimal http server to keep it alive for cPanel check
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Node.js is working perfectly!\n' + message);
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Test server listening');
});


