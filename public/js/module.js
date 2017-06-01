angular.module("notebook", ['ngRoute'])
  .config(Router)

Router.$inject = ["$routeProvider"]

function Router ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl : '/html/home.html',
      controller : 'homeController',
      controllerAs : 'home'
    })
    .when('/registerTeacher', {
      templateUrl : '/html/registerTeacher.html',
      controller : 'homeController',
      controllerAs : 'home'
    })
    .when('/teacher', {
      templateUrl : '/html/teacher.html',
      controller : 'teacherController',
      controllerAs : 'teacher'
    })
    .when('/student', {
      templateUrl : '/html/student.html',
      controller : 'studentController',
      controllerAs : 'student'
    })
    .otherwise({
      redirectTo: '/'
    });
}
