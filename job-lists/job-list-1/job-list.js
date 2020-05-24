function JobList_1(options){
    this.constructor(options);
}

JobList_1.prototype.initListeners = function(){
    
}
//placeholder for ajax calls
JobList_1.prototype.getJobs = function(){
    let req = {
        method:'GET',
        url:'https://job-dummy-api.herokuapp.com/api/indeed'
    };

    $.ajax(req)

    .then(response => {
        console.log(response);
    })

    .catch(err => {
        console.log('Error getting data: ',err);
    })
}

JobList_1.prototype.constructor = function(options){
    this.title = "Simple List";
    var parentSelector = options.parentClass.startsWith('.') ? options.parentClass : '.' + options.parentClass;
    this.parent = $(parentSelector)[0];
    console.log(this.parent);
}

JobList_1.prototype.render = function(){
    console.log(this.title);
    this.getJobs();
}

function init(){
    var jobptions = {
        parentClass:'job-card'
    };

    var joblist = new JobList_1(jobptions);

    joblist.render();
}

$(document).ready(function(){
    init();
})
