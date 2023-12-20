const UserModel = require('../models/UserModel');

async function register(req, res) {
    const { name, email, password } = req.body;
    console.log(req);
    if (!name || !email || !password) {
        return res.status(400).send('field required')
    }
    const role_id = 2
    try {
      const user = await UserModel.createUser(name, email, password, role_id);
      res.status(200).send(`User registered successfully`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

async function login(req, res) {
  const { email, password } = req.body;
  console.log(email);
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    // Dapatkan pengguna berdasarkan email
    const user = await UserModel.getUserByEmail(email);
    // Periksa apakah pengguna ditemukan
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    if (password !== user.password) {
      return res.status(401).send('Invalid email or password');
    }

    res.status(200).send(`Login successful for user with ID ${user.id}, ${user.name}, ${user.role_id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


module.exports = {
  register,
  login
};
