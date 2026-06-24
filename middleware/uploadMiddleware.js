const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// General function for generating filenames
const generateFilename = (file, cb) => {
  const ext = path.extname(file.originalname);
  cb(null, `${Date.now()}-${file.fieldname}${ext}`);
};

// Profile Picture Storage
const profilePicsDir = 'uploads/profile_pics/';
ensureDir(profilePicsDir);

const storageProfile = multer.diskStorage({
  destination: (req, file, cb) => cb(null, profilePicsDir),
  filename: (req, file, cb) => generateFilename(file, cb)
});

// Employee Document Storage
const employeeDir = 'uploads/employees/';
ensureDir(employeeDir);

const storageEmployee = multer.diskStorage({
  destination: (req, file, cb) => cb(null, employeeDir),
  filename: (req, file, cb) => generateFilename(file, cb)
});

// File filter for images only
const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// File filter for documents (optional for employee files)
const docFileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg', 'image/png', 'application/pdf',
    'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Invalid file type'), false);
};

// Create multer instances
const upload = multer({ storage: storageProfile, });
const uploadEmp = multer({ storage: storageEmployee, });

module.exports = {
  upload,
  uploadEmp
};
