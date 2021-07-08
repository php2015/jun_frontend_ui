layout.register.controller('setSystem', ['$scope', 'post', 'gets', function ($scope, post, gets) {
    gets('./data/system.json', function (res) {
        if (res) $scope.app = res;
    });
    console.log('system');
    $scope.$watch('app.isClosed', function (newValue, oldValue) {
        if (newValue == false)  $scope.app.colsed = '';
    });
    $scope.save = function () {
        post($scope.user, ROOT + '/hr/home/public/test', function (res) {
            if (res) $scope.routers.jump('/user');
        });
    }
}]);