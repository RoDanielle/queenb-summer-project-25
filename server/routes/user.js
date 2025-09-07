const express = require('express');
const { getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
 } = require('../controllers/userController')
const router = express.Router()

/**
 * Read Only Permission Routes
 */

// GET all Users
router.get('/', getAllUsers)

// GET a single User
router.get('/:id', getSingleUser)

/**
 * Read and Write Permission Routes
 */

// POST (create) a new User
router.post('/', createUser)

// DELETE a User by id
router.delete('/:id', deleteUser)

// UPDATE a User by id
router.patch('/:id', updateUser)

module.exports = router