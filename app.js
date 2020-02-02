const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

//set template engine to EJS
app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({exteneded: false}));
app.use(shopRoutes);
app.use('/admin', adminRoutes);

//add this to make public folder available to serve static files, like css
app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', (req, res, next) => {
    res.send('<h1>testing</h1>');
});

app.get('/', (req, res, next) => {
    res.send('<h1>hello</h1>');
});


app.listen(3000);