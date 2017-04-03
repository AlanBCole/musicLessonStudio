angular.module("notebook")
  .factory("studio", studioFact)

studioFact.$inject = ['$http'];

function studioFact ($http) {

// create
  function createMusician (musicianData) {
    return $http({
      method: 'POST',
      url: '/api/musician',
      data: musicianData
    })
  }

// read
  function getMusician(musicianID) {
    return $http({
      method: 'GET',
      url: 'api/musician' + (musicianID ? '/' + musicianID : '')
    })
  }

// read — get a user from cookie info
  function loggedIn() {
    return $http({
      method  : 'GET',
      url     : 'api/me'
    })
  }
  // update
  function updateMusician(musician){
    return $http({
      method : 'PUT',
      url    : '/api/musician/' + musician._id,
      data   : musician
    })
  }

    // 'delete'
    // function removeMusician(musician){
    //   method : 'PUT',
    //   url    : 'api/remove/' + musician._id
    // }

  function makeCalendar () {
    // console.log('Making a calendar!');
    // console.log($('#calendar'));
    $('#calendar').fullCalendar({
        // put your options and callbacks here
        defaultView: 'listYear',
        header: false,
        googleCalendarApiKey: 'AIzaSyC-f2G7dU42AbawTx4A6Nbx69VNJiBdmuo',
        events: {
          googleCalendarId: 'tvg5ukkqvnqahpo181f7841jp8@group.calendar.google.com'
        }
    })
  }

  return {
    loggedIn       : loggedIn,
    createMusician : createMusician,
    getMusician    : getMusician,
    updateMusician : updateMusician,
    makeCalendar   : makeCalendar
  }
}
