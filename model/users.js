const User = require('./schemas/user');

const findByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const create = async ({ email, password }) => {
  const user = new User({ email, password });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await user.updateOne({ _id: id }, { token });
};

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
};
