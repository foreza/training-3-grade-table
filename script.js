let nameInputRef;
let gradeInputRef;
let tableRef;

function addNewStudentEntry(){

  let newRowEntry = document.createElement("tr");
  let newStudent = document.createElement("td")
  let newGrade = document.createElement("td");
  let newOptions = document.createElement("td");

  newStudent.textContent = getNameFromInput();
  newGrade.textContent = getGradeFromInput();
  newOptions.textContent = "*";

  newRowEntry.appendChild(newStudent);
  newRowEntry.appendChild(newGrade);
  newRowEntry.appendChild(newOptions);

  tableRef.appendChild(newRowEntry);

  clearAllInputRef();
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

documentIsReady();


  
