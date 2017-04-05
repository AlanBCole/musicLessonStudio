var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');

var musicianSchema = mongoose.Schema({

  firstName: String,
  lastName: String,
  teacher: {type: Boolean, default: false},
  instrument: String,
  catchPhrase: String,
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
      comments: {type : Array, default : []},
      studioAnnouncements: {type: Array, default : []}
    }
  ]
});

// hash passwords before saving a new user
musicianSchema.pre('save', function (next) { // don't use an arrow function here, we need the scope!
    var user = this; // this is why we can't use an arrow function  here, again we need the scope

    // only hash the password if it has been modified (for updating users)
    if (!user.isModified('password')) {
        return next();
    }


    // generate a salt value to encrypt our password
    bcrypt.genSalt(10, (saltErr, salt) => { // used to guarentee uniqueness
        if (saltErr) {
            return next(saltErr);
        }

        console.info('SALT generated!'.yellow, salt);

        // now let's hash this bad boy!
        bcrypt.hash(user.password, salt, (hashErr, hashedPassword) => {
            if (hashErr) {
                return next(hashErr);
            }
            // over-ride the plain text password with the hashed one
            user.password = hashedPassword;
            next();
        });
    });
});

module.exports = mongoose.model('musician', musicianSchema);
