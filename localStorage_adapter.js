const localStorageAdapter = (function () {

  var ls = window.localStorage; // shortcut

  var getStudentById = (studentId) => {};

  var studentObj = (name, grade) => {
    return {
      name: name,
      grade: grade
    }
  }

  var addStudent = (studentId, studentName, studentGrade) => {
    try {
    // TODO: should make a "student object" item as this is semi-repeated code
  
    var tObj = JSON.stringify(studentObj(studentName,studentGrade))
    ls.setItem(studentId, tObj)
    return true;
    } catch(e) {
      console.error("ERR: ", e)
      return false;
    }


  };

  
  var updateStudent = (studentId, studentName, studentGrade) => {

    if (ls[studentId] != undefined){
      var tObj = JSON.stringify(studentObj(studentName,studentGrade))
      ls.setItem(studentId, tObj)
    } else {
      // We shouldn't be here.
      alert("oh no")
    }

  };


  var removeStudent = (studentId) => {

    if (ls[studentId] != undefined){
      ls.removeItem(studentId)
    } else {
      // We shouldn't be here.
      alert("oh no")
    }

  };
  

  var fetchAllStudents = () => {
    // Return all students in localStorage as an obj

    var keys = Object.keys(ls);
    var returnObj = {};

    for (var i = 0; i < keys.length; ++i) {
      
      var tEntry = JSON.parse(ls[keys[i]]);
      returnObj[keys[i]] = tEntry;
    }
    
    return returnObj;
  };
  

  var debug_checkLocalStorage = () => {

    var keys = Object.keys(ls);
    
    if (keys.length == 0){
      console.log("No students found in local storage - add some")
    } else {
      console.log("Printing all students from local storage:", keys.length);
    }

    for (var i = 0; i < keys.length; ++i) {
      var tEntry = JSON.parse(ls[keys[i]]);
      console.log(`ID: ${keys[i]}, `, tEntry);
    }
    
  }

  var debug_hardReset = () => {
    // Resets to starting state.
    ls.clear();
  }

  return {
    getStudentById,
    addStudent,
    updateStudent,
    removeStudent,
    fetchAllStudents,
    debug_checkLocalStorage,
    debug_hardReset,
  }
})();