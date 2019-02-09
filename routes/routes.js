const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');
const isAuth = require('../middleware/isAuth');
const userController = require('../controllers/courseController');

router
    .get('/courses.html', userController.getCourses)
    .post('/courses', isAuth, userController.postCourses);

router.get('/deleteCourse/:id', isAuth, userController.deleteCourse);

router.get('/forgot', authController.getForgot);

router
    .get('/login', authController.getLogin)
    .post('/login', authController.postLogin);

router
    .get('/logout', authController.postLogout);




module.exports = router;