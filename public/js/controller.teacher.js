angular.module("notebook")
  .controller("teacherController", tCtrl)

tCtrl.$inject = ["studio"];

function  tCtrl (studio) {

  var teacher = this;
  window.teacher = teacher;
  teacher.students = studio.studentList;
  teacher.notebookEdit = function (student) {
    teacher.activeStudent = student;
  }

  teacher.newLesson = function () {
    console.log(teacher.activeStudent.name);
    var lesson = {
        date: "date",
        lessonTheme: "lesson theme",
        practiceItems: {
          tonalization: [],
          workingPiece: [],
          review: [],
          listen: [],
          other: [],
        },
      };

    teacher.activeStudent.notebook.unshift(lesson);
  }

  teacher.deleteLesson = function(lesson){
    var answer = confirm("Are you sure you want to remove this lesson from " + teacher.activeStudent.name + "'s notebook?");

    if (answer) {
      teacher.activeStudent.notebook.splice(teacher.activeStudent.notebook.indexOf(lesson), 1);
    }
  }

  teacher.deleteNote = function(lesson, note, area){
    var answer = confirm("Are you sure you want to remove this lesson from " + teacher.activeStudent.name + "'s notebook?");

    if (answer) {
      lesson.practiceItems[area].splice(lesson.practiceItems[area].indexOf(note), 1);
    }
  }

  teacher.addNote = function(lesson, area){
    console.log("working...");
    teacher.activeNote = lesson;
    teacher.activeNote.practiceItems[area].push("New note...");
  }

  teacher.headingEdit = function () {
    teacher.heading = true;
  }

  teacher.headingSave = function () {
    teacher.heading = false;
  }

  teacher.noteEdit = function (letter) {
    teacher.edit = true;
    console.log("clicked!");
  }

  teacher.noteSave = function (letter) {
    // teacher.edit = false;
    teacher.edit = false;
  }

}
