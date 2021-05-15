//Import dependencies  
const path = require("path");

//Defining the routing. Shows the user either of the HTML content when they visit the page.
module.exports = function (app){
    app.get('.notes', function(req,res) {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
    app.get('/', function(req,res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};