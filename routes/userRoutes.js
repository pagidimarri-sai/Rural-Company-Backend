const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController'); // make sure this is correct

router.post('/create', createUser); // ✅ this must be a function

module.exports = router;
