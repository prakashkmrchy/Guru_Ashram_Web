const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBSessionStorage = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const MONGODB_URI = "mongodb://localhost:27017/guru_ashram";

const store = new MongoDBSessionStorage({
    uri: MONGODB_URI,
    collection: 'sessions'
   // clear_interval: 100
});

const app = express();

const route = require('./routes/routes')
const User = require('./models/admin');
const Courses = require('./models/courses');

app.set('view engine', 'pug');
app.set('views', 'view');
app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
        secret: 'YeahThisIsMySecretKey',
        resave: true,
        saveUninitialized: false,
        //cookie: {maxAge: 10000, httpOnly: true, isLoggedIn: false},
        store: store
}));

app.use( (req, res, next) => {
    console.log(req.url, req.method);
    next();
})

app.use('/', route);

app.use(express.static(path.join(__dirname, 'view')));

mongoose
    .connect(
        "mongodb://localhost:27017/guru_ashram",
        {useNewUrlParser: true}
    )
    .then(() => {
        console.log("Mongo db connected");
        // // Courses.findOne().then(user => {
        // //     if (!user) {
        // //       const user = new Courses({
        // //         title: 'XYX',
        // //         classTime: 'Morning',
        // //         details: 'Lets come together',
        // //         startingDate: '13th Feb, 2019'
        // //       });
        // //       user.save();
        // //     }
        //   });
        //   const user = new Courses({
        //     title: 'JAVA',
        //     classTime: 'Afternoon',
        //     details: 'Lets come together on AfterNoon',
        //     startingDate: '28th Feb, 2019'
        //   });
        //   user.save();
        app.listen(5000, () => {
            console.log('Server is running on port number: 5000');
        })
    })
    .catch(err => {
        console.log(err);
    })

