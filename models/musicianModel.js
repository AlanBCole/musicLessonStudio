var mongoose = require("mongoose");

var musicianSchema = mongoose.Schema({

  firstName: String,
  lastName: String,
  teacher: {type: Boolean, default: false},
  instrument: String,
  picture: String,
  phone: String,
  email: String,
  password: String,
  startedAt: {type: Number, default : ()=> Date.now()},
  notebook: [
    {
      date: {type: Number, default: ()=> Date.now()},
      lessonTheme: String,
      practiceArea: {
        tonalization: Array,
        workingPiece: Array,
        review: Array,
        listen: Array,
        other: Array
      },
      teacherComments: {type : Array, default : []},
      studentComments: {type : Array, default : []}
    }
  ]
});

module.exports = mongoose.model('musician', musicianSchema);
