// app JS structure

var myApp = angular.module('home', ['truncate']);

myApp.controller('articles-left', ['$scope', '$http', function ($scope, $http) {

    // create products object
    $scope.articles = {};
    $scope.count = '5';

    $http({
        // get data from config.json
        method: 'GET',
        url: 'json/config.json'
    })
        .success(function (data, status, headers, config) {
            // assigning to model
            $scope.UID = data.facebookUID;
        });

    $http({
        // get data from facebook
        method: 'GET',
        url: 'https://graph.facebook.com/226213847556371/posts?access_token=257246281110093|LFauDLtvm6RXTKqC-YjYbBybX-c&limit=5'
    })
        .success(function (data, status, headers, config) {
            $scope.articles = data.data;

            angular.forEach($scope.articles, function(item) {
                item.title = item.from.name;
                item.date = item.created_time;

                if (item.picture.indexOf("https://fbcdn-sphotos-c-a.akamaihd.net/")) {
                    var picture = item.picture;
                    item.image = picture.replace('hphotos-xpf1/v/t1.0-9/s130x130','hphotos-xpa1/t31.0-8/s720x720');
                }
                else if (item.picture.indexOf("https://scontent-a.xx.fbcdn.net/")) {
                    var picture = item.picture;
                    item.image = picture.replace('hphotos-ak-xpf1/v/t1.0-9/s130x130', 'hphotos-ak-xfa1/t31.0-8/s720x720');
                }
                else if ( !(item.picture.indexOf("https://fbexternal-a.akamaihd.net/")) ) {
                    item.image = item.picture;
                }

                if (item.message) {
                    item.text = item.message;
                    if (!item.picture) {
                        item.type = 1;
                    }
                    else if (item.message.length < 50) {
                        item.type = 2;
                    } else {
                        item.type = 3;
                    }
                } else if (item.story) {
                    item.text = item.story;
                    if (!item.picture) {
                        item.type = 1;
                    }
                    else if (item.story.length < 50) {
                        item.type = 2;
                    } else {
                        item.type = 3;
                    }
                }
            });
        });

    $http({
        // get data from articles.json
        method: 'GET',
        url: 'json/articles.json'
    })
        .success(function (data, status, headers, config) {
            $scope.articles.push(data.articlesleft);
        });

    $scope.orderProp = 'date';

}]);

myApp.controller('articles-right', ['$scope', '$http', function ($scope, $http) {

    // create products object
    $scope.articles = {};

    $http({
        // get data from products.json
        method: 'GET',
        url: 'json/articles.json'
    })
        .success(function (data, status, headers, config) {
            $scope.articles = data.articlesright;
        })
        .error(function (data, status, headers, config) {
            // something went wrong
        });

}]);