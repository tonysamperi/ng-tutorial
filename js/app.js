var app = angular.module("myApp", ["ngTutorial"])
    .controller('introController', function ($scope) {
        $scope.angularLoaded = "Yeah, man!";

        $scope.beginTutorial = function () {
            $scope.activateTutorial = true;
        }
    });