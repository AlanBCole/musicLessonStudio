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


  return {
    loggedIn       : loggedIn,
    createMusician : createMusician,
    getMusician    : getMusician,
    updateMusician : updateMusician
  }
}
