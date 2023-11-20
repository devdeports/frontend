require('dotenv').config();
const express = require("express");
const path = require('path');
const session = require("express-session");
const app = express();

// port
app.set('port', process.env.PORT || 3100);

// views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// url public
app.use(express.static(__dirname + "/public"));

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
   secret: "secretKey",
   resave: false,
   saveUninitialized: false
}));

// server
const server = app.listen(app.get('port'), () => {
    console.log(`Server Frontend Port: ${app.get('port')}`);
});

// routers
app.use("/", require('./routes/index'));
app.use("/users", require('./routes/users'));
app.use("/rols", require('./routes/rols'));
app.use("/settings", require('./routes/settings'));
