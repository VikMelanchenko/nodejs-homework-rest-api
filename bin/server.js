const server = require('../app');
const db = require('../model/mongodb');

const PORT = process.env.PORT || 3000;

db.then(() => {
  server.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`);
  process.exit(1);
});
