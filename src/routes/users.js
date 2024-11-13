const express = require('express');

const UserController = require('../controllers/users');

const router = express.Router();

router.get('/', UserController.getAllUsers);

router.get('/:id', UserController.getUserById);

router.post('/', UserController.createNewUser);

router.patch('/:id', UserController.updateUser);

router.delete('/:id', UserController.deleteUser);

module.exports = router;
