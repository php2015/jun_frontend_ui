<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="http://apps.bdimg.com/libs/angular.js/1.4.6/angular.min.js"></script>
<title>Insert title here</title>
</head>
<style>
.table-d table {
	background: #FFE4B5
}

.table-d table td {
	background: #FFF
}
</style>
<body>
	<div ng-app="myApp" ng-controller="customersCtrl" class="table-d"
		border="0" cellspacing="1" cellpadding="0">
		<table style="border: 0;">
			<tr ng-repeat="x in result">
				<td>{{ x.userId }}</td>
				<td>{{ x.userName }}</td>
				<td>{{ x.password }}</td>
			</tr>
		</table>
	</div>
</body>
<script>
	var app = angular.module('myApp', []);
	app.controller('customersCtrl', function($scope, $http) {
		$http.get("/user/list.json").success(function(response) {
			$scope.result = response.result;
		});
	});
</script>
</html>