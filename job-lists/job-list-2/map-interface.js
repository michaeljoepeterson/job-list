function MapInterface(options){
    this.constructor(options)
}

MapInterface.prototype.createMap = function(){
    var mapOptions = {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    };
    this.map = new google.maps.Map(this.mapElement,mapOptions);
}

MapInterface.prototype.constructor = function(options){
    this.mapElement = document.getElementById(options.id);
    this.map;
    this.createMap();
}
