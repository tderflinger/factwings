angular.module('RestaurantsService', [])

.factory('Burgers', ['$http', function($http) {
    var burgerRestos;

    return {
        all: function() {
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/restaurants/v1/burgers/München'
            });
        },

        getRestos: function() {
            return burgerRestos;
        },

        getResto: function(id) {
            for (var a = 0; a < burgerRestos.length; a++) {
                var resto = burgerRestos[a];
                if (resto._id == id) {
                    return resto;
                }
            }
        },

        setRestos: function(restos) {
            burgerRestos = restos;
        },

        getBranch: function(resto, branchId) {
            for (var a = 0; a < resto.branches.length; a++) {
                if (resto.branches[a].id == branchId) {
                    return resto.branches[a];
                }
            }
        },

        parseGps: function(gps) {
            var commaPosition = gps.search(",");
            var lat = gps.slice(0, commaPosition);
            var longi = gps.slice(commaPosition + 1, gps.length);

            return [lat, longi];
        },

        getCurrentCoordinates: function(loc, error) {
            if (!navigator.geolocation) {
                return;
            }

            navigator.geolocation.getCurrentPosition(loc, error);
        },

        displayMap: function(gps) {
            var map = L.map('mapid');

            // create the tile layer with correct attribution
            var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
            var osm = new L.TileLayer(osmUrl, { minZoom: 8, attribution: osmAttrib });

            map.setView(new L.LatLng(gps[0], gps[1]), 20);
            map.addLayer(osm);

            var marker = L.marker([gps[0], gps[1]]).addTo(map);
        }
    };
}]);