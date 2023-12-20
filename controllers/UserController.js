const UserModel = require('../models/UserModel');

async function getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await UserModel.deleteUser(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
    getAllUsers,
    deleteUser,
  };