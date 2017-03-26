

var DashboardApp = angular.module('DashboardApp', []);

DashboardApp.controller('Moksha', function ($scope, $http, $interval) {
     $scope.data = {};

     $scope.updateData = function () {
        $http.get('/data').then(function (response) {
            // console.log(response);

            $scope.data = response.data;

            angular.forEach($scope.data, function(unitSet, key) {
                angular.forEach(unitSet.items, function (item, key) {
                    if (item.status) {
                         if (item.status == 'Pass') {
                              item.color = '#C1FFC1';
                         } else if (item.status == 'Fail') {
                              item.color = '#FFE9E8';
                         }
                    } else {
                         item.color = '#CCCCCC';
                    }

                     if (item.isRunning)
                         item.isRunningColor = 'yellow';
                     else
                         item.isRunningColor = 'transparent';


                     if (item.lastRun)
                          item.lastRunString = timeSinceDate(new Date(item.lastRun)) + ' ago';


                     if (item.lastFail)
                          item.lastFailString = timeSinceDate(new Date(item.lastFail)) + ' ago';

                     if (item.isRunning)
                         item.lastRunDurationString = timeSinceDate(new Date(item.lastRun));
                     else if (item.lastRunDuration)
                         item.lastRunDurationString = timeFromSeconds(item.lastRunDuration / 1000);

                     if (item.log) {
                          if (item.log.length > 40)
                               item.logShortString = item.log.substr(0, 40) + '...';
                          else
                               item.logShortString = item.log;
                     }
                });

                //gauges['passing'].redraw(100, "%");
                //gauges['failing'].redraw(44, "v");
            });
        });
     };
     $interval($scope.updateData, 500);
     $scope.updateData();


     //$scope.updateLastRunStrings = function () {
     //     angular.forEach($scope.data, function(unitSet, key) {
     //          angular.forEach(unitSet.items, function (item, key) {
     //               if (item.lastRun)
     //                    item.lastRunString = timeSince(new Date(item.lastRun));
     //          });
     //     });
     //};
     //setInterval($scope.updateLastRunStrings, 1000);

     function timeSinceDate(date) {

          var seconds = Math.floor((new Date() - date) / 1000);
          return timeFromSeconds(seconds);
     }

     function timeFromSeconds(seconds) {
          if (seconds == 0)
               return "0 seconds";

          var interval = Math.floor(seconds / 31536000);
          if (interval > 1) {
               return interval + " years";
          }
          interval = Math.floor(seconds / 2592000);
          if (interval > 1) {
               return interval + " months";
          }
          interval = Math.floor(seconds / 86400);
          if (interval > 1) {
               return interval + " days";
          }
          interval = Math.floor(seconds / 3600);
          if (interval > 1) {
               return interval + " hours";
          }
          interval = Math.floor(seconds / 60);
          if (interval > 1) {
               return interval + " minutes";
          }
          return seconds + " seconds";
     }
});