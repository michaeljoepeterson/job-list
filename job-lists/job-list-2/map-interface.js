function MapInterface(options){
    this.constructor(options)
}

MapInterface.prototype.getLocationData = function(data){
    var locations = [];
    //handle if data passed or data.results passed
    var results = data.results ? data.results : data;
    for(var i = 0;i < results.length;i++){
        var job = results[i];
        var location = {};
        location.lat = job.latitude;
        location.lng = job.longitude;
        locations.push(location);
    }

    return locations;
}

MapInterface.prototype.getInfoData = function(data){

};

MapInterface.prototype.createInfo = function(locations){
    var locations = locations ? locations : this.locations;
};

MapInterface.prototype.addMarkers = function(locations){
    var locations = locations ? locations : this.locations;

    for(var i = 0;i < locations.length;i++){
        var pos = locations[i];
        var marker = new google.maps.Marker({position: pos, map: this.map});
        this.markers.push(marker);
    }

};

MapInterface.prototype.createMap = function(){
    var mapOptions = {
        zoom: this.defaultZoom
    };
    this.map = new google.maps.Map(this.mapElement,mapOptions);
    this.addMarkers();
    if(this.jobData && this.jobData.length > 0){
        this.positionMap(this.jobData[0]);
    }
    else{
        this.map.setcenter({
            lat:53.485450, 
            lng:-113.488751
        });
    }
    
};

MapInterface.prototype.positionMap = function(job){
    var zoom = 15;
    var center = {
        lat:job.latitude,
        lng:job.longitude
    };

    this.map.setCenter(center);
    this.map.setZoom(zoom);
};

MapInterface.prototype.constructor = function(options){
    this.mapElement = document.getElementById(options.id);
    this.map;
    this.jobData = options.jobData;
    this.defaultZoom = 13;
    var locations = this.jobData ? this.getLocationData(this.jobData) : [];

    this.locations = locations;
    this.infoWindows = [];
    this.markers = [];
    this.createMap();
};
