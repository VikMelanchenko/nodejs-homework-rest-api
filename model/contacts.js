const Contact = require('./schemas/contact');

const listContacts = async (
  userId,
  { sortBy, sortByDesc, filter, limit = '5', offset = '0' }
) => {
  const results = await Contact.paginate(
    { owner: userId },
    {
      limit,
      offset,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}), //по возврастанию
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}), // по убыванию
      },
      select: filter ? filter.split('|').join(' ') : '', // приходит owner в любом случае по причине paginate
      populate: {
        path: 'owner',
        select: 'name email -_id',
      },
    }
  );
  const { docs: contacts, totalDocs: total } = results;
  return { total: total.toString(), limit, offset, contacts };
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
