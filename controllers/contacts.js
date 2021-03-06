const Contacts = require('../model/contacts');

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await Contacts.listContacts(userId);
    return res.status(200).json({ contacts });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.getContactById(req.params.contactId, userId);
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
    const userId = req.user.id;
    const contact = await Contacts.addContact({ ...req.body, owner: userId });

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
    const userId = req.user.id;
    const contact = await Contacts.removeContact(req.params.contactId, userId);
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

  try {
    const userId = req.user.id;
    const result = await Contacts.updateContact(contactId, body, userId);
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
