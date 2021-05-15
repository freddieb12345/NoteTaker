//Import all required dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json")

//Setting up Express
var app = express();
var PORT = process.env.PORT || 3000;

//Setting up body parsing and static
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//Setting up server on the port
app.listen(PORT, () => console.log(`Listening on PORT; ${port}`))
