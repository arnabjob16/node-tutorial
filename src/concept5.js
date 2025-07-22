/**
* Concept 5: Use `process` to Log Memory and CPU Usage
* -----------------------------------------------------
* Node.js provides the `process` global object, which gives access to:
*   - Environment variables
*   - Memory and CPU usage
*   - Execution info like PID, uptime, platform, etc.
*
* 👉 Core Concepts Covered:
*   - `process.memoryUsage()` and its metrics
*   - `process.cpuUsage()`
*   - Useful monitoring/debugging info
*
* 💡 Interview Tip:
*   Be ready to explain how Node.js handles memory and why it's important to monitor heap usage in production.
*/
 
console.log('Monitoring System Resources in Node.js...\n');
 
// 1️⃣ Log memory usage
const memoryUsage = process.memoryUsage();
console.log('Memory Usage:');
console.log(`RSS             : ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`);
console.log(`Heap Total      : ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(`Heap Used       : ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
console.log(`External        : ${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`);
console.log(`Array Buffers   : ${(memoryUsage.arrayBuffers / 1024 / 1024).toFixed(2)} MB\n`);
 
// 2️⃣ Log CPU usage
const cpuUsage = process.cpuUsage(); // returns microseconds
console.log('CPU Usage:');
console.log(`User CPU Time   : ${cpuUsage.user / 1000} ms`);
console.log(`System CPU Time : ${cpuUsage.system / 1000} ms\n`);
 
// 3️⃣ Additional process info (bonus)
console.log('Process Info:');
console.log(`PID : ${process.pid}`);
console.log(`Platform        : ${process.platform}`);
console.log(`Uptime          : ${process.uptime().toFixed(2)} seconds`);
console.log(`Node Version    : ${process.version}`);