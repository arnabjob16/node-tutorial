const multer = require('multer');
const path = require('path');
 
// Set storage destination and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
cb(null, Date.now() + '-' + file.fieldname + ext); // Unique filename
  }
});
 
const fileFilter = (req, file, cb) => {
  // Accept only images
  const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
  allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Only images allowed'), false);
};
 
const upload = multer({ storage, fileFilter });
 
module.exports = upload;