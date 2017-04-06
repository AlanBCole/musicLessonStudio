angular.module("notebook")
  .controller("teacherController", tCtrl)

tCtrl.$inject = ["studio"];

function  tCtrl (studio) {
  var teacher = this;

  window.teacher = teacher;
  teacher.students = [];
  teacher.teacher = null;

  teacher.makeCalendar = function(){
    console.log('Making a calendar!');
    // console.log($('#calendar'));
      studio
        .makeCalendar();
  }

  teacher.getTeacher = function () {
    studio
      .loggedIn()
        .then(function(response) {
          console.log('getting teacher...', response.data);
          teacher.teacher = response.data;
        })
  }
  teacher.getTeacher();

  teacher.getStudents = function () {
    studio
      .getMusician()
        .then(function(response) {
          console.log('getting' + teacher.teacher.instrument + ' students...', response.data);
          teacher.students = response.data;
        })
  }
  teacher.getStudents();

  teacher.studentSelected = false;

  teacher.studentSelect = function (student) {
    teacher.activeStudent = student;
    teacher.studentSelected = true;
    console.log(teacher.activeStudent.firstName + teacher.activeStudent.lastName +"'s notebook", student);
  }

  teacher.newLesson = function () {
    console.log("Adding a lesson...");
    var lesson = {
        date: Date.now(),
        lessonTheme: "lesson theme",
        practiceArea: {
          tonalization: [],
          workingPiece: [],
          review: [],
          listen: [],
          other: [],
        },
        comments: [],
        studioAnnouncements: []
      };

    teacher.activeStudent.notebook.unshift(lesson);
    console.log(teacher.activeStudent.notebook[0]);
  }

  teacher.save = function (str, area) {
    studio
    .updateMusician(teacher.activeStudent)
    .then(function(response){
      console.log(response, str, area);
    });
  }

  teacher.themeEdit = function () {
    teacher.theme = true;
    console.log("Editing practice theme...");
  }

  teacher.themeSave = function () {
    teacher.theme = false;
    teacher.save("Saving practice theme...");
  }

  teacher.deleteLesson = function(lesson){
    var answer = confirm("Are you sure you want to remove this lesson from " + teacher.activeStudent.firstName + "'s notebook?");

    if (answer) {
      teacher.activeStudent.notebook.splice(teacher.activeStudent.notebook.indexOf(lesson), 1);
      teacher.save("Deleting a lesson...");
    }
  }

  teacher.addNote = function(lesson, area){
    // teacher.activeNote = lesson;
    lesson.practiceArea[area].push({text: "New note...", edit: false});
    console.log("Adding a new note to " + area);
  }

  teacher.noteEdit = function (note, area) {
    note.edit = true;
    console.log("Editing a " + area + " note...\n" + note.text);
  }

  teacher.noteSave = function (note, area, event) {
    // console.log(event.which);
    if (event.which === 13) {
      console.log("Used 'enter' key, #" + event.which + " ...");
      teacher.save("Saving a note to", area);
      note.edit = false;
    }
  }

  teacher.deleteNote = function(lesson, note, area){
    var answer = confirm("Are you sure you want to remove this lesson from " + teacher.activeStudent.firstName + "'s notebook?");

    if (answer) {
      lesson.practiceArea[area].splice(lesson.practiceArea[area].indexOf(note), 1);
      teacher.save("Deleting note from", area);
    }
  }

// a plain DOM manipulation
  teacher.addComment = function (lesson) {
    var comment = {text: document.getElementById("comment-input").value, type: 't'}
    lesson.comments.push(comment);
    teacher.save("Teacher is commenting...");
    document.getElementById("comment-input").value = '';
  }

  teacher.teacherEdit = function(){
    console.log("updating " + teacher.teacher.firstName + "'s information")

    $('#teacherUpdate').modal('show');
  }

  teacher.teacherUpdate = function () {
      studio
      .updateMusician(teacher.teacher)
      .then(function(response){
        console.log(teacher.teacher, response);
      });
      $('#teacherUpdate').modal('hide');
    }

// similar to addComment just using angular/ng-model instead
  teacher.announcement = '';
  teacher.announce = function () {

    console.log(teacher.announcement);

    // loops through all students with matching instruments with teacher
    for (var i = 0; i < teacher.students.length; i++) {

      if (teacher.students[i].instrument === teacher.teacher.instrument) {
        // console.log(teacher.students[i]);
    // long notation because this function is triggered outside of notebook div-panels
        teacher.students[i].notebook[0] = teacher.students[i].notebook[0] || {studioAnnouncements : []};
        teacher.students[i].notebook[0].studioAnnouncements.unshift(teacher.announcement);
        console.log("adding announcement in " + teacher.students[i].firstName + "'s " + teacher.students[i].notebook[0].date + "notebook");
        studio
        .updateMusician(teacher.students[i])
        .then(function(response){
          console.log(response);
        });
      }
    }
    teacher.announcement = '';
  }

}
