/**
 * Concept 9: Serve Static Files Using Node.js (No Express)
 * ---------------------------------------------------------
 * This example demonstrates how to serve HTML, CSS, JS, images, etc. using only Node.js.
 * 
 * 👉 Core Concepts Covered:
 *   - File serving with `fs.createReadStream`
 *   - Setting correct `Content-Type` (MIME)
 *   - Handling file not found (404)
 * 
 * 💡 Interview Tip:
 *   Be able to explain how static file servers work internally — routing a request to a file, reading it, and streaming the content.
 */
 
const http = require('http');
const fs = require('fs');
const path = require('path');
 
// Set the base directory for static files
const staticDir = path.join(__dirname, '../public');
 
const server = http.createServer((req, res) => {
  console.log(`Request: ${req.url}`);
 
  // Default to index.html for "/"
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(staticDir, filePath);
 
  // Get file extension to set Content-Type
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.css':  'text/css',
    '.js':   'application/javascript',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.gif':  'image/gif',
    '.ico':  'image/x-icon',
    '.json': 'application/json',
  };
 
  const contentType = mimeTypes[ext] || 'application/octet-stream';
 
  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - File Not Found');
      return;
    }
 
    // Stream the file to response
    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});
 
module.exports = server;
 