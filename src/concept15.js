/**
 * Concept 15: File Upload using Multer in Express
 * ------------------------------------------------
 * `multer` is a Node.js middleware for handling `multipart/form-data`,
 * primarily used for uploading files.
 * 
 * 👉 Core Concepts Covered:
 *   - Configure `multer` storage and destination
 *   - Handle single file upload (POST /upload)
 *   - Serve uploaded files
 * 
 * 💡 Interview Tip:
 *   Know the difference between `multipart/form-data` and `application/json`.
 *   Be able to explain how multer intercepts incoming form-data and saves files.
 */
 
const express = require('express');
const multer = require('multer');
const path = require('path');
 
const app = express();
 
// 1️⃣ Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads')); // destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // e.g. avatar-123456.jpg
  }
});
 
const upload = multer({ storage: storage });
 
// 2️⃣ Form page to upload files
app.get('/', (req, res) => {
  res.send(`
    <h2>Concept 15: File Upload</h2>
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="avatar" />
      <button type="submit">Upload</button>
    </form>
  `);
});
 
// 3️⃣ Upload route
app.post('/upload', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send(`File uploaded successfully! <br>Saved as: <a href="/public/uploads/${req.file.filename}" target="_blank">View File</a>`);
});
 
// 4️⃣ Serve uploaded files statically
app.use('/public/uploads', express.static(path.join(__dirname, '../public/uploads')));
 
// 5️⃣ 404 handler
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});
 
module.exports = app;
 