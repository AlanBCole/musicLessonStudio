angular.module("notebook")
  .controller('homeController', hCtrl)

  hCtrl.$inject = ['studio', '$http'];

  function hCtrl (studio, $http) {
    var home = this;

    home.musicians = [];

    home.getMusicians = function() {
      studio
      .getMusician()
      .then(function(response) {
        console.log(response.data, 'home');
        home.musicians = response.data;
      })
    }
    home.getMusicians();

    home.payloads = {
      login: {},
      register: {}
    }

    home.login = {
        // happens when the user clicks submit on the login form
        submit: function ($event) { // click-event



            console.info('home.login.submit', $event);

            $http.post('/api/login', home.payloads.login)
                .then(home.login.success, home.login.error);
            // do no forget your error callback!

        },
        success: function (res) { // server response callback
            // when login is successful, redirect them into the teacher or student page
            console.log(res.data);
            if (res.data.teacher) {

              location.href = "#!/teacher";
            }
            else {
              location.href = "#!/student"
            }
        },
        error: function (err) {
            console.error('Login.error', err);

            // user feedback stuffs, sets up the alert box on error
            home.login.message = (err.data && err.data.message) || 'Login failed, contact us!';
        }
    };

    home.register = {
        submit: function () {
          home.payloads.register.instrument = home.payloads.register.instrument.toLowerCase();
          if (home.payloads.register.password === document.querySelector("#password-confirm").value) {

            studio
              .createMusician(home.payloads.register)
                .then(home.register.success, home.login.error);
                // home.payloads.register = {};
          }
          else {
            alert("Make sure your Password and Confirmation Password match!")
          }
        },
        success: function (res) {
            // when register is successful, just redirect them into the dashboard (already logged in)
            console.info('home.register.success', res.data);
            if (res.data.teacher) {
              console.log(res.data.firstName + "is a teacher");
              location.href = "#!/teacher";
            }
            else {
              console.log(res.data.firstName + "is a student")
              location.href = "#!/student"
            }
        },
        error: function (err) {
            console.error('home.register.error', err);
            // user feedback stuffs, sets up the alert box on error
            home.register.message = (err.data && err.data.message) || 'Register failed, contact us!';
        }
    };

    // home.registerMusician = function () {
    //   if (document.querySelector("#password").value === document.querySelector("#password-confirm").value) {
    //     studio
    //       .createMusician(home.payloads.register)
    //         .then(function(response) {
    //           console.log(response.data, "Saving new musician...");
    //         })
    //         home.payloads.register = {};
    //   }
    //   else {
    //     alert("Make sure your Password and Confirmation Password match!")
    //   }
    // }




  }
