let nameInputRef;
let gradeInputRef;
let tableRef;


// Temporary things to allow our script to function with localstorage
let uniqueIDCounter = Date.now();
let localStorageEnabled = true;


// Helper function
function util_createRowButton(onClickFunc, className, textContent) {
  var newButton = document.createElement("button");
  newButton.setAttribute("onclick", onClickFunc);
  newButton.setAttribute("class", className);
  newButton.textContent = textContent;
  return newButton;
}

// OnClick handler for form input
function onclick_AddNewStudent() {
  var tNameInput = getNameFromInput();
  var tGradeInput = getGradeFromInput();
  addNewStudent(tNameInput, tGradeInput)
}


/*
  Main entry point for adding a student.
  - Creates a new ID (TODO: This should always be determined server-side!)
  - Adds this to local storage (TODO: replace with backend/DB)
  - Renders the new row
*/
function addNewStudent(name, grade) {
  var id = uniqueIDCounter++;                    // always increment the counter to ensure uniqueness here.
  ls_addNewStudentEntry(id, name, grade);
  display_addNewStudentRow(id, name, grade)
}


// Appends a new row to the table given a name and a grade
function display_addNewStudentRow(id, name, grade) {

  let newRowEntry = document.createElement("tr");
  newRowEntry.id = `row${id}`;

  let newStudent = document.createElement("td")
  newStudent.id = `row${id}-name`;
  let newGrade = document.createElement("td");
  newGrade.id = `row${id}-grade`;
  let newOptions = document.createElement("td");
  newOptions.id = `row${id}-options`;

  let tSpan = document.createElement("span");
  tSpan.textContent = name;
  tSpan.id = `row${id}-name-value`;
  newStudent.appendChild(tSpan);

  tSpan = document.createElement("span");
  tSpan.textContent = grade;
  tSpan.id = `row${id}-grade-value`;
  newGrade.appendChild(tSpan);

  // Create the edit, delete, save, cancel buttons dynamically
  let optionsEditDeleteGroup = document.createElement("div");
  optionsEditDeleteGroup.id = `row${id}-optionsEditDelete`;

  let optionsSaveCancelGroup = document.createElement("div");
  optionsSaveCancelGroup.id = `row${id}-optionsSaveCancel`;

  let editButton = util_createRowButton(`enableRowEditMode(${id})`, "optionsMenu", "Edit");
  let deleteButton = util_createRowButton(`deleteRowForID(${id})`, "optionsMenu", "Delete");
  let saveButton = util_createRowButton(`updateStudentForRow(${id})`, "optionsMenu", "Save");
  let cancelButton = util_createRowButton(`cancelEditForRow(${id})`, "optionsMenu", "Cancel");

  newOptions.appendChild(editButton);
  newOptions.appendChild(deleteButton);

  optionsEditDeleteGroup.appendChild(editButton);
  optionsEditDeleteGroup.appendChild(deleteButton);
  optionsSaveCancelGroup.appendChild(saveButton);
  optionsSaveCancelGroup.appendChild(cancelButton);
  optionsSaveCancelGroup.hidden = true;

  newOptions.appendChild(optionsEditDeleteGroup);
  newOptions.appendChild(optionsSaveCancelGroup);

  newRowEntry.appendChild(newStudent);
  newRowEntry.appendChild(newGrade);
  newRowEntry.appendChild(newOptions);

  tableRef.appendChild(newRowEntry);
}


// Adds a new entry to the local storage
function ls_addNewStudentEntry(id, name, grade) {

  try {

    // TODO: Temporary to do CRUD on local storage
    if (localStorageEnabled && localStorageAdapter == undefined) {
      throw (new Error("LocalStorage not plugged in!"))
    } else {
      console.log("Adding student with counter: ", id);
      localStorageAdapter.addStudent(id, name, grade);
    }
  } catch (e) {
    // TODO: error handling
    console.error(e);
  } finally {
    // clearAllInputRef();  // TODO: re-enable this
  }
}




function getNameFromInput() {
  if (typeof (nameInputRef) != 'undefined') {
    return nameInputRef.value;
  }
}

function getGradeFromInput() {
  if (typeof (gradeInputRef) != 'undefined') {
    return gradeInputRef.value;
  }
}

function clearAllInputRef() {
  gradeInputRef.value = "";
  nameInputRef.value = "";
}


function deleteRowForID(rowID) {
  console.log("deleteRowForID: ", rowID);

  // Update the view
  var rowToDelete = document.getElementById(`row${rowID}`);
  rowToDelete.remove();

  // Update the items in localstorage
  if (localStorageEnabled) {
    localStorageAdapter.removeStudent(rowID);
  }
}


function enableRowEditMode(rowID) {
  console.log("enableRowEditMode: ", rowID);

  // Handle hiding the current row info
  var studentValSpanRef = document.getElementById(`row${rowID}-name-value`);
  var gradeValSpanRef = document.getElementById(`row${rowID}-grade-value`);

  studentValSpanRef.hidden = true;
  gradeValSpanRef.hidden = true;

  // Replace the name/grade row with input values
  var studentValRef = document.getElementById(`row${rowID}-name`);
  var gradeValRef = document.getElementById(`row${rowID}-grade`);

  var nameEditBox = document.createElement("input");
  nameEditBox.value = studentValSpanRef.innerText;
  nameEditBox.id = `row${rowID}-name-editInput`;
  studentValRef.appendChild(nameEditBox);

  var gradeEditBox = document.createElement("input");
  gradeEditBox.value = gradeValSpanRef.innerText;
  gradeEditBox.id = `row${rowID}-grade-editInput`;
  gradeValRef.appendChild(gradeEditBox);

  // Replace the options section with 2 new buttons

  var optionsToHide = document.getElementById(`row${rowID}-optionsEditDelete`);
  optionsToHide.hidden = true;

  var optionsToShow = document.getElementById(`row${rowID}-optionsSaveCancel`);
  optionsToShow.hidden = false;

}

// Update the values in display as well as local storage
function updateStudentForRow(rowID) {
  console.log("updateStudentForRow: ", rowID);

  // Save the values
  var studentValSpanRef = document.getElementById(`row${rowID}-name-value`);
  var gradeValSpanRef = document.getElementById(`row${rowID}-grade-value`);
  var studentValUpdated = document.getElementById(`row${rowID}-name-editInput`);
  var gradeValUpdated = document.getElementById(`row${rowID}-grade-editInput`);

  // Update the display
  studentValSpanRef.textContent = studentValUpdated.value;
  gradeValSpanRef.textContent = gradeValUpdated.value;

  // Update the items in localstorage
  if (localStorageEnabled) {
    localStorageAdapter.updateStudent(rowID, studentValUpdated.value, gradeValUpdated.value)
  }

  exitRowEditMode(rowID);
}


// Leaves edit mode. In this case, no local storage/network manipulation needed.
function cancelEditForRow(rowID) {
  console.log("cancelEditForRow: ", rowID);
  // No changes done here.
  exitRowEditMode(rowID);
}


function exitRowEditMode(rowID) {
  console.log("exitRowEditMode: ", rowID);

  // Handle visibility of the current row info
  var studentValSpanRef = document.getElementById(`row${rowID}-name-value`);
  var gradeValSpanRef = document.getElementById(`row${rowID}-grade-value`);

  studentValSpanRef.hidden = false;
  gradeValSpanRef.hidden = false;

  var editBoxForName = document.getElementById(`row${rowID}-name-editInput`);
  var editBoxForGrade = document.getElementById(`row${rowID}-grade-editInput`);

  editBoxForName.remove();
  editBoxForGrade.remove();

  var optionsToShow = document.getElementById(`row${rowID}-optionsEditDelete`);
  optionsToShow.hidden = false;

  var optionsToHide = document.getElementById(`row${rowID}-optionsSaveCancel`);
  optionsToHide.hidden = true;
}


// Requires the randomuserapi adapter - fetches X random items from network
async function fetchRandomStudentsForQuantity(qty) {

  if (randomUserAPIAdapter != undefined) {
    var arr_response = await randomUserAPIAdapter.getStudentsForNumAsync(qty);

    for (var i = 0; i < arr_response.length; ++i) {
      addNewStudent(arr_response[i].studentName, arr_response[i].studentGrade)
    }

  } else {
    alert("Something went wrong!")
  }

}


// Sets up the initial state of the page
function setupInputRef() {
  nameInputRef = document.getElementById("inputNewStudent");
  gradeInputRef = document.getElementById("inputNewGrade");
  tableRef = document.getElementById("gradeTableBody");
}


// Initial entry point for the page
function documentIsReady() {
  setupInputRef();

  if (localStorageEnabled) {
    var tCollection = localStorageAdapter.fetchAllStudents();

    var tKeys = Object.keys(tCollection);
    for (var i = 0; i < tKeys.length; ++i) {
      var tObj = tCollection[tKeys[i]]
      display_addNewStudentRow(tKeys[i], tObj.name, tObj.grade);
    }
  }

  console.log("Document ready");
}

documentIsReady();