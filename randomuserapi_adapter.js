const randomUserAPIAdapter = (function () {

  // Student object constructor
  var studentObj = (name, grade) => {
    return {
      studentName: name,
      studentGrade: grade
    }
  }

  // Utility function for specifically parsing out the randomuserapi response
  function util_parseNetworkResponse(responseText) {

    var responseObject = JSON.parse(responseText);
    var tRespArr = [];

    for (var i = 0; i < responseObject.results.length; ++i) {
      var tName = responseObject.results[i].name.first + " " + responseObject.results[i].name.last;
      var tGrade = responseObject.results[i].dob.age; // Temp: use the "age" as their grade.
      var tStudent = studentObj(tName, tGrade);
      tRespArr.push(tStudent);
    }

    return tRespArr;
  }

  async function awaitableFetchFromStudentEndpoint(num) {

    // TODO: client side validation

    var promise = new Promise((res, rej) => {
      var baseURL = "https://randomuser.me/api/?results=" + num;
      var request = new XMLHttpRequest();

      // request.addEventListener('load', util_parseNetworkResponse)
      request.onload = function () {
        if (this.status == 200) { // TODO - support other status codes
          res(request.responseText)
        } else {
          // TODO
          rej(this.status);
        }
      }
      request.open("GET", baseURL);
      request.send();
    });

    return promise;
  }


  // The only exposed function
  const getStudentsForNumAsync = async (num) => {
    var response = await awaitableFetchFromStudentEndpoint(num);
    var responseArr = util_parseNetworkResponse(response);
    return responseArr;
  };

  return {
    getStudentsForNumAsync,
  }
})();

