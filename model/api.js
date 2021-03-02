const db = require('./mongodb');
const { ObjectID } = require('mongodb');
const getCollection = require('./helpers');

const listContacts = async () => {
  const collection = await getCollection(db, 'contacts');
  const results = await collection.find({}).toArray();
  return results;
};

const getContactById = async (contactId) => {
  const collection = await getCollection(db, 'contacts');
  const objectId = new ObjectID(contactId);
  console.log(objectId.getTimestamp());
  const [result] = await collection.find({ _id: objectId }).toArray();
  return result;
};

const addContact = async (body) => {
  // const data = await fs.readFile(contactsPath, 'utf-8');
  // const contacts = JSON.parse(data);
  const newContact = {
    ...body,
    ...(body ? {} : { body: false }),
  };
  const collection = await getCollection(db, 'contacts');
  const {
    ops: [result],
  } = await collection.insertOne(newContact);
  return result;
  // contacts.push(newContact);
  // await fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  // });
  // return newContact;
};

const removeContact = async (contactId) => {
  const collection = await getCollection(db, 'contacts');
  const objectId = new ObjectID(contactId);
  const { value: result } = await collection.findOneAndDelete({
    _id: objectId,
  });
  return result;
};

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, 'contacts');
  const objectId = new ObjectID(contactId);
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: body },
    { returnOriginal: false }
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
