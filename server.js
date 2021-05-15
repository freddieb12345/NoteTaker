//Import all required dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json")

//Setting up Express
var app = express();
var PORT = process.env.PORT || 3000; //Tells the sever what PORT to listen to

//Setting up body parsing and static middleware. These are methods/functions that are called between processing requests and sending responses and are required for POST and PUT requests as these are sending data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public')); //defines the directory in which all the required files for the app are present

//Setting up server on the port
app.listen(PORT, () => console.log(`Listening on PORT; ${port}`))

//When the page is initially loaded, we want it to start on the index.html page.
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req,res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//API calls
app.route("/api/notes")
    //Get the notes list
    .get(function(req,res) {
        res.json(database);
    })