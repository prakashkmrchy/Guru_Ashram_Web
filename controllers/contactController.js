exports.getPage = (req, res, next) => {
    return res
        .status(200)
        .render('contact',{path: '/contact', loggedIn: req.session.isLoggedIn});
};