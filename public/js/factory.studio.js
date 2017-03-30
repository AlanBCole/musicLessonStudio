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

  // update
  function updateMusician(musician){
    return $http({
      method : 'PUT',
      url    : '/api/musician/' + musician._id,
      data   : musician
    })

    // 'delete'
    // function removeMusician(musician){
    //   method : 'PUT',
    //   url    : 'api/remove/' + musician._id
    // }
  }


  return {
    createMusician : createMusician,
    getMusician    : getMusician,
    updateMusician: updateMusician
  }
}
  // var students = [
  //
  //   {
  //     name: "Justin",
  //     phone: "303.330.3030",
  //     notebook: [
  //       {
  //         date: "2-18-17",
  //         lessonTheme: "l.h. pinky shape",
  //         practiceItems: {
  //             tonalization: ["D — run pony run pony"],
  //             workingPiece: ["Rigadoon", "bb 1-2 slowly"],
  //             review: [""],
  //             listen: ["listen to Dido and Aenias", "Gaspar Sans"],
  //             other: ["look up baroque lute", "look up baroque guitar"],
  //           },
  //       },
  //     ],
  //   },
  //
  //   {
  //     name: "Angela",
  //     phone: "303.030.3030",
  //     notebook: [
  //       {
  //         date: "2-18-17",
  //         lessonTheme: "accurate m + i",
  //         practiceItems:
  //           {
  //             tonalization: ["G — mississippi stop stop"],
  //             workingPiece: ["Country Dance", "r.h. mm 3-4"],
  //             review: ["Meadow Minuet", "Perpetual Motion"],
  //             listen: ["Louie Andreissen", "Carulli guitar + piano"],
  //             other: [""],
  //           },
  //       },
  //     ],
  //   },
  //
  //   {
  //     name: "Pulgar",
  //     phone: "303.303.3030",
  //     notebook: [
  //       {
  //         date: "2-18-17",
  //         lessonTheme: "mental preparation",
  //         practiceItems: {
  //             tonalization: ["C maj - 2 octaves", "closed position"],
  //             workingPiece: ["f# + c# in m. 2 of 2nd var.", "focus on shift in var. 3"],
  //             review: ["book 2"],
  //             listen: ["Enríquez de Valderrábano "],
  //             other: ["look up 'Romanesca'"],
  //           },
  //       },
  //       {
  //         date: "2-11-17",
  //         lessonTheme: "Have fun!",
  //         practiceItems: {
  //             tonalization: ["C maj - 2 octaves", "melodic pattern from b. 8"],
  //             workingPiece: ["1st var., get used to new tuning"],
  //             review: ["Giuliani study (a minor)"],
  //             listen: ["Listen to Nigel North lute recordings"],
  //             other: ["look up the vihuela"],
  //           },
  //       },
  //     ],
  //   },
  //
  // ]


//   return {
//     studentList: students
//   }
//
// }
