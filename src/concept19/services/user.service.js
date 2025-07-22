const User = require('../models/user.model');

exports.createUser = async (name) => {
  if (!name) throw new Error('Name is required');
  const user = new User({ name });
  return await user.save();
};

exports.getUsers = async () => {
  return await User.find();
};
