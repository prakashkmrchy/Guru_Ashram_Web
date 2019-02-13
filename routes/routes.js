const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');
const isAuth = require('../middleware/isAuth');
const userController = require('../controllers/courseController');
const mailController = require('../controllers/emailController');
const contactController = require('../controllers/contactController');
const instituteController = require('../controllers/instituteController');

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

router
    .get('/contact.html', contactController.getPage)
    .post('/contact', mailController.sendResponse);

router.get('/institutes.html', instituteController.getPage);

router.get('/deleteInstitute/:id', isAuth, instituteController.deleteImage);



module.exports = router;