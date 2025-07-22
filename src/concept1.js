/**
* Concept 1: Basic Node.js HTTP Server
* ------------------------------------
* This demonstrates how to create a web server using Node.js core module `http`.
* It's important for interviews to know how Node.js handles requests internally,
* without using frameworks like Express.js.
*
* 👉 Core Concepts Covered:
*   - http module
*   - createServer method
*   - request and response objects
*   - HTTP status codes
*   - Basic routing using `req.url`
*
* 💡 Interview Tip:
*   Be ready to explain how Node.js handles concurrency with its event-driven, non-blocking model.
*/
 
// Import Node.js built-in 'http' module
const http = require('http');


/**
* Create the HTTP server
* ----------------------
* The callback receives two parameters:
*   - req: IncomingMessage object (contains method, url, headers, etc.)
*   - res: ServerResponse object (used to send data back to client)
*/
const server = http.createServer((req, res) => {
  // Set response header (status code + content type)
  res.writeHead(200, { 'Content-Type': 'text/plain' });
 
  /**
   * Simple routing based on the requested URL
   * -----------------------------------------
   * This is manual routing. In real apps, use Express.js or a routing library.
   */
  if (req.url === '/') {
    res.end('Welcome to the Home Page');
  } else if (req.url === '/about') {
    res.end('This is the About Page');
  } else {
    res.end('404 - Page Not Found');
  }
});
 
module.exports = server;
