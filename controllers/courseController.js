const User = require('../models/courses');

exports.getCourses = (req, res, next) => {
    console.log("LoggedIn: ", req.session.isLoggedIn);
    User.find()
    .then(result => {
        console.log(result);
        res
            .status(200)
            .render('course',{data: result, loggedIn: req.session.isLoggedIn, path: '/courses'});
    })
    .catch(err => {
        console.log(err);
    })
};

exports.postCourses = (req, res, next) => {
    const title = req.body.title;
    const maxStudents = req.body.max;
    const details = req.body.details;
    const startingDate = req.body.startingDate;
    if(!title || !maxStudents || !details || !startingDate) {
        req.flash('error', 'Please fill all required fields.');
        res
            .status(401)
            .render('/postCourses');
    }
    const user = new User({
        title: title,
        maxStudents: maxStudents,
        details: details,
        startingDate: startingDate
    })
    user
        .save()
        .then(result => {
            console.log('Course Added');
            res.redirect('/courses');
        })
        .catch(err => {
            console.log(err);
        })

};

exports.deleteCourse = (req, res, next) => {
    const id = req.params.id;
    User.findByIdAndRemove(id, (err, msg) => {
            if(err) {
                console.log(err);
            }
            res
                .status(200)
                .redirect('/courses.html');
    });
}