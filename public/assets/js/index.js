const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");
let activeNote = {}; //This allows you to keep track of the current note in the text area

//Create a function that gets the notes from the database
const getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};

//Create a function that saves a note to the db
const saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: ":POST",
  });
};

//Create a function that deletes the note from the db
const deleteNote = (id) => {
  return $.ajax({
    url: "/api/notes" +id,
    method: "DELETE",
  });
};

//On page load, display the active note if there is one but if not, display the inputs as empty
const renderActiveNote = () => {
  $saveNoteBtn.hide();

  if(activeNote.id) { 
    $noteTitle.attr("readonly", true); //Sets readonly status to true if there is an active note
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title); //Sets the title and text to be equal to the active note
    $noteText.val(activeNote.text);
  }else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
}

//Saving the date from the inputs to the database and then repopulating the html to show the update
const handleNoteSave = function() {
  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
  };

  saveNote(newNote).then(() => {
    getAndRenderNotes();
    RenderActiveNote();
  });
};

//Creating event that deletes the note when it is clicked
const handleNoteDelete = function(e) {
  e.stopPropagation();

  const note = $(this).parent("list-group-item").data();

  if(activeNote.id === note.id) {
    activeNote={};
  }

  deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

//Setting and displaying the active note
const handleNoteView = function () {
  activeNote = $(this).data();
  renderActiveNote();
};

//Function allowing user to create new note
const handleNewNoteView = function () {
  activeNote = {};
  renderActiveNote();
}

//Hiding the save button if there is no content in the title and text inputs
const handleRenderSaveBtn = function () {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};