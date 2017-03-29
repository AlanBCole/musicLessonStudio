angular.module("notebook")
  .controller("studentController", sCtrl)

sCtrl.$inject = ["studio"];

function sCtrl(studio) {
  var student = this;
  student.students = studio.studentList;

  student.showNotebook = function (pupil) {
    student.activeStudent = pupil;
  }
}
