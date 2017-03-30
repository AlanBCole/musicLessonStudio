angular.module("notebook")
  .controller("teacherController", tCtrl)

tCtrl.$inject = ["studio"];

function  tCtrl (studio) {

  var teacher = this;
  window.teacher = teacher;
  teacher.students = [];

  teacher.getStudents = function () {
    studio
      .getMusician()
        .then(function(response) {
          console.log(response.data);
          teacher.students = response.data;

        })
  }

  teacher.studentSelect = function (student) {
    teacher.activeStudent = student;
    console.log(teacher.activeStudent.name + "'s notebook");
  }

  teacher.newLesson = function () {
    console.log("Adding a lesson...");
    var lesson = {
        date: "date",
        lessonTheme: "lesson theme",
        practiceArea: {
          tonalization: [],
          workingPiece: [],
          review: [],
          listen: [],
          other: [],
        },
        comments: []
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
      lesson.practiceArea[area].splice(lesson.practiceArea[area].indexOf(note), 1);
      console.log("deleting note...");
    }
  }

  teacher.addNote = function(lesson, area){
    console.log("adding a note...");
    teacher.activeNote = lesson;
    teacher.activeNote.practiceArea[area].push("New note...");
  }

  teacher.headingEdit = function () {
    teacher.theme = true;
  }

  teacher.headingSave = function () {
    teacher.theme = false;
  }

  teacher.noteEdit = function () {
    teacher.edit = true;
    console.log("editing a note...");
    studio
      .updateMusician(teacher.activeStudent)
      .then(function(response){
        console.log("saving...", response);
      })
  }

  teacher.noteSave = function (letter) {
    // teacher.edit = false;
    teacher.edit = false;

  }
  teacher.getStudents();
}
