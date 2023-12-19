const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
