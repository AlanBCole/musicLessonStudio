angular.module("notebook")
  .controller("studentController", sCtrl)

sCtrl.$inject = ["studio"];

function sCtrl(studio) {
  var student = this;

  student.getInfo = function () {
    studio
      .getMusician()
        .then(function(response) {
          console.log(response.data, "student");
          student.students = response.data;

        })
  }
  student.getInfo();
  // student.students = studio.studentList;

  student.showNotebook = function (pupil) {
    student.activeStudent = pupil;
  }

  student.save = function (str, area) {
    studio
    .updateMusician(student.activeStudent)
    .then(function(response){
      console.log(response, str, area);
    });
  }

  student.addComment = function(lesson) {

    lesson.studentComments.push(document.getElementById("comment-input").value);
    student.save("Student or Parent is commenting...");
    document.getElementById("comment-input").value = '';
  }

}
