// const fs = require('fs/promises');
// const path = require('path');
const db = require('./mongodb');
const { ObjectID } = require('mongodb');

// const contactsPath = path.join(__dirname, './contacts.json');

//helpers

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const listContacts = async () => {
  const collection = await getCollection(db, 'contacts');
  const results = await collection.find({}).toArray();
  // const data = await fs.readFile(contactsPath, 'utf-8');
  // const contacts = JSON.parse(data);
  return results;
};

const getContactById = async (contactId) => {
  const collection = await getCollection(db, 'contacts');
  const objectId = new ObjectID(contactId);
  console.log(objectId.getTimestamp());
  const [result] = await collection.find({ _id: objectId }).toArray();
  return result;
  // const data = await fs.readFile(contactsPath, 'utf-8');
  // const contacts = JSON.parse(data);
  // const getContact = contacts.find(
  //   (contact) => contact.id === Number(contactId)
  // );
  // return getContact;
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
  // const data = await fs.readFile(contactsPath, 'utf-8');
  // const contacts = JSON.parse(data);
  // const deletedContact = contacts.filter(
  //   (contact) => contact.id !== Number(contactId)
  // );
  // if (contacts.length === deletedContact.length) {
  //   return console.error(`Contact with ID ${contactId} not found`);
  // }
  // await fs.writeFile(contactsPath, JSON.stringify(deletedContact));
  // console.log(`Contact with ID ${contactId} removed succesfully`);
  // return deletedContact;
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

  // const data = await fs.readFile(contactsPath, 'utf-8');
  // const contacts = JSON.parse(data);
  // const contact = await getContactById(contactId);
  // const updatedContacts = contacts.map((contact) => {
  //   if (contact.id === Number(contactId)) {
  //     return { ...contact, ...body };
  //   }
  //   return contact;
  // });
  // await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  // return { ...contact, ...body };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
