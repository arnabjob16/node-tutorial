const userService = require('../services/user.service');

// Create
exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body.name);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
exports.getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
};
