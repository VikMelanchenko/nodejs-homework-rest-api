const User = require('./schemas/user');

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  const user = await User.findOne({ _id: id });
  return user;
};

const create = async ({ email, password }) => {
  const user = new User({ email, password });
  return await user.save();
};

const updateToken = async (id, token) => {
  const user = await User.updateOne({ _id: id }, { token });
  return user;
};

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
};
