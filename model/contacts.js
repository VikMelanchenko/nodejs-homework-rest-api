const Contact = require('./schemas/contact');

const listContacts = async (userId) => {
  const results = await Contact.find({ owner: userId }).populate({
    path: 'owner',
    select: 'email -_id',
  });
  return results;
};

const getContactById = async (contactId, userId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'name email -_id',
  });
  return result;
};

const addContact = async (body) => {
  const newContact = await Contact.create(body);
  return newContact;
};

const removeContact = async (contactId, userId) => {
  const result = await Contact.findByIdAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
};

const updateContact = async (contactId, body, userId) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    {
      returnOriginal: false,
    }
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
