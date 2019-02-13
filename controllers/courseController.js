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
    console.log(req.body);
    const title = req.body.title;
    const name = req.body.name;
    const info = req.body.about;
    const startingDate = req.body.starting_date;
    //const details = req.body.details;
    const classTime = req.body.batch_time;
    console.log(title, name, info, startingDate,  classTime);
    if(!title || !startingDate || !name ) {
        req.flash('error', 'Please fill all required fields.');
        return res
            .status(401)
            .render('/postCourses');
    }
    const user = new User({
        title: title,
        name: name,
        classTime: classTime,
        details: info,
        startingDate: startingDate
    })
    user
        .save()
        .then(result => {
            console.log('Course Added');
            res.redirect('/courses.html');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/courses.html');
        })

        

};

exports.deleteCourse = (req, res, next) => {
    const id = req.params.id;
    User.findOneAndDelete({_id: id}, (err, msg) => {
            if(err) {
                console.log(err);
            }
            res
                .status(200)
                .redirect('/courses.html');
    });
}