const multer = require('multer');
const path = require('path');

/**
 * Multer configuration for handling image uploads.
 */

// Set up storage engine. For simplicity, we'll save to a local 'uploads' directory.
// In a production app, you would use something like multer-s3 to upload directly to a cloud storage provider.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // The destination folder for uploads
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Create a unique filename to avoid overwriting files with the same name
    // Filename will be: fieldname-timestamp.extension
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

/**
 * File filter to ensure only image files are uploaded.
 * @param {object} req - The request object.
 * @param {object} file - The file object.
 * @param {function} cb - The callback function.
 */
const checkFileType = (file, cb) => {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check the extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check the mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};

// Initialize the upload middleware with the configured storage and file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Set a file size limit (e.g., 5MB)
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
