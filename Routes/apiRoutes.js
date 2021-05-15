//Importing dependencies

const fs = require("fs");
const {v4: uuidv4} = require('uuid'); //uuid is a module that allows for unique identification

//Defining routing
module.exports = function(app) {
    //GET request
    app.get("/api/notes", (req,res) => {
        console.log("\nExecuting GET notes request")
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8")); //Gets the data by reading the database file
        console.log("\nGet request sucessful, returning data:" + JSON.stringify(data));
        res.json(data); //This line sends the read data from the database to the response of the GET request
    });
    //POST request
    app.post("/api/notes", (req,res) => {
        const newNote = req.body;  //Getting new note from the request body
        console.log("\nPOST request: " + JSON.stringify(newNote));
        newNote.id = uuidv4();//Using the uuid module, adda unique id to the new note
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8")); //Read the db.json file and assign the data withing it to a variable
        data.push(newNote);//Push the new note to the above data
        fs.writeFileSync('./db/db.json', JSON.stringify(data)); //Write the new data to back to the database file
        console.log("\nSucessfully added the new note to the database")  
        res.json(data); //send response
    });
    //DELETE request

    app.delete("/api/notes/:id", (req,res) => {
        let noteId = req.params.id.toString(); //This gets the id of the note to be deleted
        console.log(`\nDELETE note request for note id: ${noteId}`);
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        const newData = data.filter(note => note.id.toString() !== noteId); //Creates a new dataset filtering out the nodeId that is to be deleted
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));//Writing newData to the database
        console.log(`Sucessfully deleted note with id: ${noteId}`);
        res.json(newData);//send response
        
    })
}