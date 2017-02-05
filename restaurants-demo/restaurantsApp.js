var restaurantsApp = angular.module('RestaurantsApp', ['ngRoute', 'RestaurantsService', 'angular.filter']);

restaurantsApp.controller('BurgerController', ['$scope', 'Burgers', function($scope, Burgers) {
    burgerPromise = Burgers.all();
    burgerPromise.then(function(payload) {
        var burgerRestaurants = payload.data;

        $scope.burgers = burgerRestaurants;
        Burgers.setRestos(burgerRestaurants);

        $scope.location = function(location) {
            console.log("in here geolocation");
            console.log(location.coords.latitude);
            console.log(location.coords.longitude);
            console.log(location.coords.accuracy);
        };

        $scope.locerror = function(error) {
            for (var a=0; a<$scope.burgers.length; a++) {
                for (var b=0; b<$scope.burgers[a].branches.length; b++) {
                    $scope.burgers[a].branches[b].dist = "unknown";
                }
            }

            $scope.$apply();
        };

        Burgers.getCurrentCoordinates($scope.location, $scope.locerror);
    });
}]);

restaurantsApp.controller('MapController', ['$scope', '$routeParams', '$rootScope', 'Burgers', function($scope, $routeParams, $rootScope, Burgers) {
    var resto = Burgers.getResto($routeParams.restoId);
    var branch = Burgers.getBranch(resto, $routeParams.branchId);

    if (branch == undefined) {
        return;
    }

    var gps = Burgers.parseGps(branch.gps);

    console.log("Branch: " + JSON.stringify(branch));
    console.log("GPS: " + gps);

    Burgers.displayMap(gps);

    $scope.burger = resto;
    $scope.branch = $routeParams.branchId;

    $rootScope.burgerListHidden = true;
}]);

restaurantsApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/map/:restoId/:branchId', {
            templateUrl: 'burgerMap.html',
            controller: 'MapController'
        });
});