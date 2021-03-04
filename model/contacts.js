// const db = require('./mongodb');
// const { ObjectID } = require('mongodb');
// const getCollection = require('./helpers');

const Contact = require('./schemas/contact');

const listContacts = async () => {
  const results = await Contact.find({});
  return results;
};

const getContactById = async (contactId) => {
  const result = await Contact.findOne({ _id: contactId });
  return result;
};

const addContact = async (body) => {
  const newContact = await Contact.create(body);
  return newContact;

  // const newContact = {
  //   ...body,
  //   ...(body ? {} : { body: false }),
  // };
  // const collection = await getCollection(db, 'contacts');
  // const {
  //   ops: [result],
  // } = await collection.insertOne(newContact);
  // return result;
};

const removeContact = async (contactId) => {
  // const collection = await getCollection(db, 'contacts');
  // const objectId = new ObjectID(contactId);
  // const { value: result } = await collection.findOneAndDelete({
  //   _id: objectId,
  // });

  const result = await Contact.findByIdAndRemove({
    _id: contactId,
  });
  return result;
};

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { ...body },
    {
      returnOriginal: false,
    }
  );
  return result;
  // const collection = await getCollection(db, 'contacts');
  // const objectId = new ObjectID(contactId);
  // const { value: result } = await collection.findOneAndUpdate(
  //   { _id: objectId },
  //   { $set: body },
  //   { returnOriginal: false }
  // );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
