const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

const mongoConnect = require('./util/db').mongoConnect;
const User = require('./models/user');

//set template engine to EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

//add this to make public folder available to serve static files, like css
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5e3ed9cee844e413f1269e18')
    .then(user => {
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    })
    .catch(err => console.log(err));
})

app.use(bodyParser.urlencoded({exteneded: false}));
app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.get('/test', (req, res, next) => {
    res.send('<h1>testing</h1>');
});

app.get('/', (req, res, next) => {
    res.send('<h1>hello</h1>');
});


mongoConnect(()  => {
        app.listen(3000);
});
