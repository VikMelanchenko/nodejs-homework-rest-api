const server = require('../app');
const db = require('../model/mongodb');
const createFolderIsNotExist = require('../helpers/create-dir');
const app = require('../app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

db.then(() => {
  server.listen(PORT, async () => {
    const UPLOAD_DIR = process.env.UPLOAD_DIR;
    const USERS_AVATARS = process.env.USERS_AVATARS;
    await createFolderIsNotExist(UPLOAD_DIR); // создалась
    await createFolderIsNotExist(USERS_AVATARS); // создалась папка для хранения статики
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`);
  process.exit(1);
});
