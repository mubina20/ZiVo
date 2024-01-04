const express = require('express');
const app = express();

const router_bssr = require('./router_bssr'); // BSSR
const router = require('./router'); // SPA

// MongoDB connect
let session = require('express-session');  
const MongoDBStore = require('connect-mongodb-session')(session); 
const store = new MongoDBStore({ 
    uri: process.env.MONGO_URL, 
    collection: "sessions" 
});


// 1: Entry code 
app.use(express.static('public')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

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