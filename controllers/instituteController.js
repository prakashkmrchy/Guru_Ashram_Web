const Gallery = require('../models/institute');

exports.getPage = (req, res, next) => {
    Gallery.find()
    .then(result => {
        console.log(result);
        res
        .status(200)
        .render('institute', {data: result, path: '/institutes', loggedIn: req.session.isLoggedIn});
    })
    .catch(err => {
        console.log(err);
    });
}

exports.deleteImage = (req, res, next) => {
    const id = req.params.id;
    console.log("deleting image");
    Gallery.findByIdAndRemove(id, (err, msg) => {
        if(err) {
            console.log(err)
        }
        res
            .status(200) 
            .redirect('/institutes.html');
    })
}