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
};


MapInterface.prototype.getInfoData = function(data){
    var jobInfo = [];
    var results = data.results ? data.results : data;
    for(var i = 0;i < results.length;i++){
        var job = results[i];
        var jobData = {
            position:job.jobtitle,
            postingDate:job.date,
            info:job.snippet
        };
        jobInfo.push(jobData);
    }

    return jobInfo;
};

MapInterface.prototype.buildInfoString = function(job){
    var infoString =  '<div class="info-window">'
    + '<h2 class="info-position">' + job.position + '</h2>'
    + '<h4 class="info-date">' + job.postingDate + '</h4>'
    + '<p class="info-description">' + job.info + '</p>'
    + '</div>'
    ;

    return infoString;
};
//need to add info window even listener here to avoid variable hoisting issue
//with js
MapInterface.prototype.addInfoWindowEvent = function(infoWindow,marker){
    marker.addListener('click',function(){
        infoWindow.open(this.map,marker);
    });
};

MapInterface.prototype.addInfo = function(){
    for(var i = 0;i < this.jobInfo.length;i++){

        var job = this.jobInfo[i];
        var infoString = this.buildInfoString(job);
        var marker = this.markers[i];
        var infoWindow = new google.maps.InfoWindow({
            content: infoString
        });

        this.addInfoWindowEvent(infoWindow,marker);
        this.infoWindows.push(infoWindow);

    }   
  
    console.log(this.infoWindows);
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
    this.addInfo();
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

MapInterface.prototype.positionMap = function(job,index){
    var zoom = 15;
    var center = {
        lat:job.latitude,
        lng:job.longitude
    };
    
    if(index || index === 0){
        this.infoWindows[index].open(this.maps,this.markers[index]);
    }
    
    this.map.setCenter(center);
    this.map.setZoom(zoom);
};

MapInterface.prototype.constructor = function(options){
    this.mapElement = document.getElementById(options.id);
    this.map;
    this.jobData = options.jobData;
    this.defaultZoom = 13;
    this.locations = this.jobData ? this.getLocationData(this.jobData) : [];
    this.jobInfo = this.jobData ? this.getInfoData(this.jobData) : [];
    this.infoWindows = [];
    this.markers = [];

    this.createMap();
};
