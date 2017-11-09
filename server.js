// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");
var login = require("./routing/loginRoutes");
var bodyParser = require("body-parser");

// Set up the Express app
var app = express();
var PORT = process.env.PORT || 3000;

// var db = require("./models");

// Set up Express to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));

// handles user login control
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var router = express.Router();
// test route
router.get("/", function(req, res) {
    res.json({ message: "welcome to our upload module apis" });
});
//route to handle user registration
router.post("/register", login.register);
router.post("/login", login.login)
app.use("/api", router);

// Routes
// =============================================================
require("./routing/apiRoutes.js")(app);
require("./routing/htmlRoutes.js")(app);


// Start server to begin listening 
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});