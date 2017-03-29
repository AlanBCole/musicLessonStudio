var mongoose = require("mongoose");

var musicianSchema = mongoose.Schema({

  name: String,
  role: String,
  phone: String,
  email: String,
  parents: [
    {
      name: String,
      phone: String,
      email: String
    }
  ],
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
      comments: Array
    }
  ]
});

module.exports = mongoose.model('musician', musicianSchema);
