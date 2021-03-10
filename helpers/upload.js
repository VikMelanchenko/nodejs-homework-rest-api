const multer = require('multer');
const path = require('path');
require('dotenv').config();
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);
// const storeImage = path(process.cwd(), 'images');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage, // сздали хранилище, где будем хранить
  limits: { fileSize: 200000 }, //максимальный размер аватара
  fileFilter: (req, res, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
});

module.exports = upload;
