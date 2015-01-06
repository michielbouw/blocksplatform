// app JS structure
angular.module('home', ['truncate'])
    .directive('homeitems', function() {
        return {
            templateUrl: 'content-home-items.html',
            link: function(scope, element, attrs) {
                angular.element(document).ready(function() {
                    var $containerRight = $('.items.right');
                    $containerRight.isotope({
                        itemSelector: '.items.right #article',
                        layoutMode: 'masonry',
                        masonry: {
                            columnWidth: '.items.right #article'
                        }
                    });
                    $containerRight.isotope('layout');

                    var $containerLeft = $('.items.left');
                    $containerLeft.isotope({
                        itemSelector: '.items.left #article',
                        layoutMode: 'masonry',
                        masonry: {
                            columnWidth: '.items.left #article'
                        }
                    });
                    $containerLeft.isotope('layout');
                });
            }
        };
    })

    .service('Isotope', function(){
        this.init = function(container) {
            initIsotope();
        };
        this.append = function(container, elem) {
            var $containerLeft = $('.items.left');
            var $containerRight = $('.items.right');
            $containerLeft.isotope()
                .append( elem )
                .isotope( 'appended', elem )
                .isotope('layout');
            $containerRight.isotope()
                .append( elem )
                .isotope( 'appended', elem )
                .isotope('layout');
        }
    })

    .controller('articles', ['$scope', '$http', function ($scope, $http) {
        $scope.articles = {};

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

                    if ( item.object_id ) {
                        item.image = "https://graph.facebook.com/" + item.object_id + "/picture";
                    }
                    else if ( (item.picture.indexOf("https://fbexternal-a.akamaihd.net/")) != -1 ) {
                        if ( (item.picture.indexOf("http%3A%2F%2F")) != -1 ) {
                            var index = item.picture.indexOf("http%3A%2F%2F");
                            item.image = item.picture.substr(index).replace('%3A%2F%2F','://').replace('%2F','/');
                        } else if ( (item.picture.indexOf("https%3A%2F%2F")) != -1 ) {
                            var index = item.picture.indexOf("https%3A%2F%2F");
                            item.image = item.picture.substr(index).replace('%3A%2F%2F','://').replace('%2F', '/');
                        }
                    } else {
                        item.image = "";
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

        $scope.orderProp = 'date';

        $scope.articlesright = {};

        $http({
            // get data from products.json
            method: 'GET',
            url: 'json/articles.json'
        })
            .success(function (data, status, headers, config) {
                $scope.articlesright = data.articlesright;
            });

        $scope.$on('$viewContentLoaded', function() {
            initIsotope();
        });

    }]);




