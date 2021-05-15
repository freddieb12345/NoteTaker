//Import dependencies
const express = require("express");

//Setting up Express
var app = express();
var PORT = process.env.PORT || 3000; //Tells the sever what PORT to listen to

//Setting up body parsing and static middleware. These are methods/functions that are called between processing requests and sending responses and are required for POST and PUT requests as these are sending data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public')); //defines the directory in which all the required files for the app are present

//Setting up routes
require('./Routes/apiRoutes')(app);
require('./Routes/htmlRoutes')(app);

//Setting up server on the port
app.listen(PORT, () => console.log(`Listening on PORT; ${port}`))
