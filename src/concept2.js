/**
 * Concept 2: Create a Simple REST API using Node.js (without Express)
 * -------------------------------------------------------------------
 * This example shows how to handle HTTP methods like GET and POST using only the core `http` module.
 * No external frameworks are used.
 * 
 * 👉 Core Concepts Covered:
 *   - HTTP methods: GET, POST
 *   - JSON parsing
 *   - Routing by method + path
 *   - Basic REST API behavior
 * 
 * 💡 Interview Tip:
 *   You may be asked to build a REST API without Express. Be ready to explain request handling and JSON parsing manually.
 */
 
// Import Node.js built-in 'http' module
const http = require('http');
 
// Sample in-memory data
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
 
const server = http.createServer((req, res) => {
  // Extract method and URL path
  const { method, url } = req;
 
  // Set common response headers
  res.setHeader('Content-Type', 'application/json');
 
  // GET /users - List all users
  if (method === 'GET' && url === '/users') {
    res.writeHead(200);
    res.end(JSON.stringify(users));
 
  // POST /users - Add a new user
  } else if (method === 'POST' && url === '/users') {
    let body = '';
 
    // Collect data chunks
    req.on('data', chunk => {
      body += chunk.toString();
    });
 
    // When all data is received
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        const newUser = {
          id: users.length + 1,
          name: parsed.name || 'Unnamed',
        };
        users.push(newUser);
 
        res.writeHead(201);
        res.end(JSON.stringify({ message: 'User added', user: newUser }));
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON format' }));
      }
    });
 
  // Fallback for unsupported routes
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

module.exports = server;