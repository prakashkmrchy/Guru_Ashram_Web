const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.get('/courses.html', userController.getCourses);

router.get('/forgot', userController.getForgot);

router.get('/login', userController.getLogin);

module.exports = router;