function MapInterface(options){
    this.constructor(options)
}

MapInterface.prototype.createInfo = function(locations){
    var locations = locations ? locations : this.locations;
}

MapInterface.prototype.addMarkers = function(locations){
    var locations = locations ? locations : this.locations;

    for(var i = 0;i < locations.length;i++){
        var pos = locations[i];
        var marker = new google.maps.Marker({position: pos, map: this.map});
    }

}

MapInterface.prototype.createMap = function(){
    var mapOptions = {
        center: {lat: 53.485450, lng: -113.488751},
        zoom: this.defaultZoom
    };
    this.map = new google.maps.Map(this.mapElement,mapOptions);
    this.addMarkers();
}

MapInterface.prototype.constructor = function(options){
    this.mapElement = document.getElementById(options.id);
    this.map;
    this.defaultZoom = 13;
    this.locations = options.locations ? options.locations : [
        {
            lat:53.485450, 
            lng:-113.488751
        },
        {
            lat:53.477103, 
            lng:-113.488310
        },
        {
            lat:53.547536, 
            lng:-113.492812
        }
    ]
    this.createMap();
}
