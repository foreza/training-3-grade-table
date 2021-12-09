let nameInputRef;
let gradeInputRef;
let tableRef;

let uniqueIDCounter = 0;      // increment this as we add students

function addNewStudentEntry(){

  // use uniqueIDCounter

  try {
    let newRowEntry = document.createElement("tr");
    newRowEntry.id = `row${uniqueIDCounter}`;

    let newStudent = document.createElement("td")
    newStudent.id = `row${uniqueIDCounter}-name`;
    let newGrade = document.createElement("td");
    newGrade.id = `row${uniqueIDCounter}-grade`;
    let newOptions = document.createElement("td");
    newOptions.id = `row${uniqueIDCounter}-options`;

    let tSpan = document.createElement("span");
    tSpan.textContent = getNameFromInput();
    tSpan.id = `row${uniqueIDCounter}-name-value`;
    newStudent.appendChild(tSpan);

    tSpan = document.createElement("span");
    tSpan.textContent = getGradeFromInput();
    tSpan.id = `row${uniqueIDCounter}-grade-value`;
    newGrade.appendChild(tSpan);
  
    // Create the edit, delete, save, cancel buttons dynamically
    
    let optionsEditDeleteGroup = document.createElement("div");
    optionsEditDeleteGroup.id = `row${uniqueIDCounter}-optionsEditDelete`;

    let optionsSaveCancelGroup = document.createElement("div");
    optionsSaveCancelGroup.id = `row${uniqueIDCounter}-optionsSaveCancel`;

    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    let saveButton = document.createElement("button");
    let cancelButton = document.createElement("button");

    editButton.setAttribute("onclick", `enableRowEditMode(${uniqueIDCounter})`);
    editButton.setAttribute("class", "optionsMenu");
    editButton.textContent = "Edit";

    deleteButton.setAttribute("onclick", `deleteRowForID(${uniqueIDCounter})`);
    deleteButton.setAttribute("class", "optionsMenu");
    deleteButton.textContent = "Delete";

    saveButton.setAttribute("onclick", `updateStudentForRow(${uniqueIDCounter})`);
    saveButton.setAttribute("class", "optionsMenu");
    saveButton.textContent = "Save";

    cancelButton.setAttribute("onclick", `cancelEditForRow(${uniqueIDCounter})`);
    cancelButton.setAttribute("class", "optionsMenu");
    cancelButton.textContent = "Cancel";

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
  
  } catch (e) {
    // TODO: error handling
    console.error(e);
  } finally {
    uniqueIDCounter++; // always increment the counter
    // clearAllInputRef();  // TODO: re-enable this
  }

  
}


function setupInputRef() {
  nameInputRef = document.getElementById("inputNewStudent");
  gradeInputRef = document.getElementById("inputNewGrade");
  tableRef = document.getElementById("gradeTableBody");
}

function getNameFromInput(){
  if (typeof(nameInputRef) != 'undefined') {
    return nameInputRef.value;
  }
}

function getGradeFromInput(){
  if (typeof(gradeInputRef) != 'undefined') {
    return gradeInputRef.value;
  }
}

function clearAllInputRef(){
  gradeInputRef.value = "";
  nameInputRef.value = "";
}


function documentIsReady() {
  setupInputRef();
  console.log("Document ready");
}


function deleteRowForID(rowID){
  console.log("deleteRowForID: ", rowID);
  var rowToDelete = document.getElementById(`row${rowID}`);
  rowToDelete.remove();
}


function enableRowEditMode(rowID){
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

function updateStudentForRow(rowID){
  console.log("updateStudentForRow: ", rowID);

  // Save the values
  var studentValSpanRef = document.getElementById(`row${rowID}-name-value`);
  var gradeValSpanRef = document.getElementById(`row${rowID}-grade-value`);
  var studentValUpdated =  document.getElementById(`row${rowID}-name-editInput`);
  var gradeValUpdated =  document.getElementById(`row${rowID}-grade-editInput`);

  studentValSpanRef.textContent = studentValUpdated.value;
  gradeValSpanRef.textContent = gradeValUpdated.value;

  exitRowEditMode(rowID);
}

function cancelEditForRow(rowID){
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

  var optionsToShow  = document.getElementById(`row${rowID}-optionsEditDelete`);
  optionsToShow.hidden = false;

  var optionsToHide = document.getElementById(`row${rowID}-optionsSaveCancel`);
  optionsToHide.hidden = true;
}

// test function
function doMockData(){
  nameInputRef.value = "hi"
  gradeInputRef.value = 123;
}

documentIsReady();
doMockData();