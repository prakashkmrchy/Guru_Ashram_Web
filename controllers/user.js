exports.getCourses = (req, res, next) => {
    res
        .status(200)
        .render('course');
};

exports.getForgot = (req, res, next) => {
    res
        .status(200)
        .render('forgot');
}

exports.getLogin = (req, res, next) => {
    res
        .status(200)
        .render('login');
}