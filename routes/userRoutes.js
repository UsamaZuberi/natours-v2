const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();

router
    .route('/')
    .get(userController.getAllUsers)             // Get All Users
    .post(userController.createUser);            // Create User

router
    .route('/:id')
    .get(userController.getUser)                 // Get User
    .patch(userController.updateUser)            // Update User
    .delete(userController.deleteUser);          // Delete User

module.exports = router;