const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const route = require('./routes/routes')

app.set('view engine', 'pug');
app.set('views', 'view');

app.use(bodyParser.urlencoded({ extended: false }));



app.use( (req, res, next) => {
    console.log(req.url, req.method);
    next();
})

app.use('/', route);

app.use(express.static(path.join(__dirname, 'view')));

app.listen(5000, () => {
    console.log('Server is running on port number: 3000');
})
