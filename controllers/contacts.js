const Contacts = require('../model/contacts');

const getAll = async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.status(200).json({ contacts });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json({ data: { contact } });
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);

    if (!contact.name || !contact.email) {
      return res.status(400).json({ message: 'missing required name field' });
    }

    return res.status(201).json({ contact });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json({ message: 'contact deleted' });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;
  console.log(contactId);

  try {
    const result = await Contacts.updateContact(contactId, body);
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
