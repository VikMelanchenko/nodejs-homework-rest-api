const HTTPCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = {
  HTTPCode,
};
//---------------------------------------------------------
// const db = require('./mongodb');

// //helpers

// const getCollection = async (db, name) => {
//   const client = await db;
//   const collection = await client.db().collection(name);
//   return collection;
// };

// module.exports = getCollection;
