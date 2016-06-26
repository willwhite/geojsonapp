// Load native UI library
geojsonApp.menu.init();
var fs = require('fs');
var dnode = require('dnode');
var lightStyle = require('./style/mapbox-light.json');
var geojsonExtent = require('geojson-extent');
var geojsonNormalize = require('geojson-normalize');

var server = dnode({
    open : function (s, cb) {
        try {
            geojson(JSON.parse(s.data), s.noClear);
        } catch(e){
            console.error('Error parsing geojson', e);
        }
        cb();
    }
}, {weak:false});
server.listen(5004);

var layers = [];

L.mapbox.accessToken = 'pk.eyJ1IjoibWlja3QiLCJhIjoiLXJIRS1NbyJ9.EfVT76g4A5dyuApW_zuIFQ';
var map = L.mapbox.map('map', 'mapbox.streets')
  .setView([37.8, -96], 4);

function geojson(data, noClear) {
    data = geojsonNormalize(data);
    var bounds = geojsonExtent(data);
    map.featureLayer.setGeoJSON(data);
    map.fitBounds(L.latLngBounds(L.latLng(bounds[1], bounds[0]), L.latLng(bounds[3], bounds[2])));
}
