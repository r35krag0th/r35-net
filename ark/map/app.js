$(document).ready(function() {
    var MapManager = function() {
        this.markers = {}
        this.map = L.map('map', {
            minZoom: 1,
            maxZoom: 4,
            center: [0, 0],
            zoom: 2,
            crs: L.CRS.Simple
        });

        imageUrl = 'http://r35.net/ark/map/Ark_HR_Map.png';
        image_height = 2048;
        image_width = 2048;

        var southWest = this.map.unproject([0, image_height], this.map.getMaxZoom() - 1);
        var northEast = this.map.unproject([image_width, 0], this.map.getMaxZoom() - 1);
        var bounds = new L.LatLngBounds(southWest, northEast);
        // var bounds = new L.LatLngBounds(northEast, southWest);

        L.imageOverlay(imageUrl, bounds).addTo(this.map);
        this.map.setMaxBounds(bounds);
    };

    MapManager.prototype.create_marker = function(name, icon, m_color, i_color) {
        this.markers[name] = L.AwesomeMarkers.icon({
            icon: icon,
            markerColor: m_color,
            iconColor: i_color,
            prefix: 'fa',
        });

    };

    MapManager.prototype.add = function(marker, lat, lng, a_description) {
        L.marker(coords(lat, lng),{
            icon: this.markers[marker]
        })
        .addTo(this.map)
        .bindPopup(a_description);
    };

    function fixLat(currentClickLat) {
        if (currentClickLat > 0) { currentClickLat = -currentClickLat }
        else { currentClickLat = Math.abs(currentClickLat) };
        return currentClickLat;
    }

    function coords(x, y) {
        x = fixLat(x);

        var lat_scale = 2.5;
        var lng_scale = 2.5;

        var lat_offset = -5 / lat_scale;
        var lng_offset = 4.5 / lng_scale;


        var lat = x + lat_offset;
        var lng = y + lng_offset;

        lat *= lat_scale;
        lng *= lng_scale;

        return [lat, lng];
    }

    var app = new MapManager();
    app.create_marker('MainBase', 'home', 'blue', 'white');
    app.create_marker('BranchBase', 'home', 'cadetblue', 'white');
    app.create_marker('PersonalBase', 'home', 'green', 'white');
    app.create_marker('SurfaceCave', 'diamond', 'red', 'white');
    app.create_marker('UnderwaterCave', 'arrow-down', 'black', 'white');

    app.add('BranchBase', 10.9, 22.2, 'Underwater Base at Cave 9');
    app.add('BranchBase', 36.5, 58.8, 'Obsidian Mountain: Peak');
    app.add('PersonalBase', 85.1, 82.8, 'Command Center Indigo');
    app.add('PersonalBase', 76.0, 26.9, "Delt's Hut (WIP)");
    app.add('MainBase', 60.4, 39.3, 'Home 2.0 (FOB)');
    app.add('MainBase', 79.7, 32.6, 'Home 1.0');

    // Surface Caves
    app.add('SurfaceCave', 19.1, 19.0, 'North West Cave (?)');
    app.add('SurfaceCave', 41.5, 46.9, 'North Central Cave (<s>Artifact</s>)');
    app.add('SurfaceCave', 14.7, 85.4, 'North East Cave (<s>Artifact</s>)');
    app.add('SurfaceCave', 70.6, 86.1, 'South East Cave (Artifact)');
    app.add('SurfaceCave', 68.3, 56.1, 'South #2 Cave (Artifact)');
    app.add('SurfaceCave', 80.2, 53.5, 'South #1 Cave (Artifact)');

    // Underwater Caves
    app.add('UnderwaterCave', 16.0, 10.0, 'Underwater Cave');
    app.add('UnderwaterCave', 10.0, 21.5, 'Underwater Cave');
    app.add('UnderwaterCave', 08.3, 89.7, 'Underwater Cave');
    app.add('UnderwaterCave', 36.3, 91.5, 'Underwater Cave');
    app.add('UnderwaterCave', 52.7, 91.9, 'Underwater Cave');
    app.add('UnderwaterCave', 87.4, 89.7, 'Underwater Cave');
    app.add('UnderwaterCave', 90.3, 71.3, 'Underwater Cave');
    app.add('UnderwaterCave', 89.8, 36.8, 'Underwater Cave');
    app.add('UnderwaterCave', 90.8, 14.0, 'Underwater Cave');
    app.add('UnderwaterCave', 83.0, 09.0, 'Underwater Cave');
    app.add('UnderwaterCave', 50.5, 11.2, 'Underwater Cave');
});
