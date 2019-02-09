const bcrypt = require('bcrypt');

const User = require('../models/admin');

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
    .then(user => {
        if(!user) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login');
        }
        bcrypt
            .compare(password, user.password) 
            .then((matched) => {
                if(matched) {
                    req.session.isLoggedIn = true;
                    req.session.cookie.maxAge = 1000000 * 60 * 60;
                    return res.redirect('/index.html');
                }
                req.flash('error', 'Invalid email or password.');
                res.redirect('/login');
            })
    })
    .catch(err => {
        console.log(err);
        res.redirect('/login');
    })
}

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    console.log(message);
    if(message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res
        .status(200)
        .render('login',{pageTitle: 'Login Page', errorMessage: message});
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if(err)
            console.log(err);
        res.redirect('/');
    })
}

exports.getForgot = (req, res, next) => {
    res
        .status(200)
        .render('forgot');
}

exports.check = (req, res, next) => {
    console.log("I am here");
    console.log(req.params.id);
    return res 
        .status(200)
        .redirect('/login');
}