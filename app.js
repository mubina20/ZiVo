const express = require('express');
const app = express();

const router_bssr = require('./router_bssr'); // BSSR
const router = require('./router'); // SPA

const cors = require('cors');
const cookieParser = require('cookie-parser');

// MongoDB connect
let session = require('express-session');  
const MongoDBStore = require('connect-mongodb-session')(session); 
const store = new MongoDBStore({ 
    uri: process.env.MONGO_URL, 
    collection: "sessions" 
});


// 1: Entry code 
app.use(express.static('public')); 
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.use(cookieParser());

// 2: Session code  
app.use( 
    session({ 
        secret: process.env.SESSION_SECRET, 
        cookie: { 
            maxAge: 1000 * 60 * 30,
        },
        store: store, 
        resave: true,
        saveUninitialized: true 
    })
);

app.use(function(req, res, next) {
    res.locals.member = req.session.member;
    next();
});

// 3. View code
app.set("views", "views"); 
app.set("view engine", "ejs");

// 4: Routing code  
app.use("/admin", router_bssr); // BSSR
app.use("/", router); // SPA

module.exports = app; 