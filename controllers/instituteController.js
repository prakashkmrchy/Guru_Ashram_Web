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

exports.addImage = (req, res, next) => {
    //console.log(req.body);
    const title = req.body.title;
    const info = req.body.about;
    const data = req.file.path.split('/');
    const file = data[1] + '/' + data[2];
    const gallery = new Gallery({
        name: title,
        info: info,
        path: file
    })
    gallery
        .save()
        .then(result => {
            console.log("Image Added");
            res.redirect('/institutes.html')
        })
        .catch(err =>  {
            console.log(err);
            res.redirect('/institutes.html');
        })

}