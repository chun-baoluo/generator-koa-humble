(function() {
	var self = new Object();

	self.app = angular.module('app', []);

  self.app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$').endSymbol('$}');
  }]);

	self.app.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {

	}]);

})();
