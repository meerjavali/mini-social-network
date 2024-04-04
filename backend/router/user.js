const express = require('express');
const controller = require('../controller/user');

const router = express.Router();



router.post('/signUp',controller.createdUser );

router.post('/login', controller.userLogin);

module.exports = router;