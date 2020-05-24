function JobList_1(options){
    this.constructor(options);
}

JobList_1.prototype.initListeners = function(){
    
}

JobList_1.prototype.buildSingleCard = function(cardData){
    var card = $('<div class="row job-card"></div>');
    var titleContainer = $('<div class="job-card-titles col-sm-12 col-md-6"></div>');
    var descContainer = $('<div class="job-card-description col-sm-12 col-md-6"></div>');
    var jobTitle = $('<p class="job-title"></p>');
    var jobLink = $('<a></a>');
    var jobCompany = $('<p class="job-company"></p>');
    jobCompany.text(cardData.company);
    var jobLocation = $('<p class="job-location"></p>');
    jobLocation.text(cardData.formattedLocationFull);
    var jobDate = $('<p class="job-date"></p>');
    jobDate.text(cardData.date);
    var jobDesc = $('<p></p>');
    jobDesc.text(cardData.snippet);
    //build link
    jobLink.attr('href',cardData.url);
    jobLink.attr('target','_blank');
    jobLink.text(cardData.jobtitle);
    //build title and description containers
    jobTitle.append(jobLink);
    titleContainer.append(jobTitle);
    titleContainer.append(jobCompany);
    titleContainer.append(jobLocation);
    titleContainer.append(jobDate);
    descContainer.append(jobDesc);
    //add to card
    card.append(titleContainer);
    card.append(descContainer);
    return card;
}

JobList_1.prototype.buildCards = function(data){
    var jobCard = $('<div class="job-cards"></div>');

    for(var i = 0;i < data.length;i++){
        var cardData = data[i];
        var card = this.buildSingleCard(cardData);
        jobCard.append(card);
    }
    
    this.parent.append(jobCard);
}

//placeholder for ajax calls
JobList_1.prototype.getJobs = function(){
    var req = {
        method:'GET',
        url:'https://job-dummy-api.herokuapp.com/api/indeed'
    };

    $.ajax(req)

    .then(response => {
        console.log(response);
        this.buildCards(response.data.results);
    })

    .catch(err => {
        console.log('Error getting data: ',err);
    })
}

JobList_1.prototype.constructor = function(options){
    this.title = "Simple List";
    var parentSelector = options.parentClass.startsWith('.') ? options.parentClass : '.' + options.parentClass;
    //wrap selected dom element in $ to make $ object available to class
    this.parent = $($(parentSelector)[0]);
    console.log(this.parent);
}

JobList_1.prototype.render = function(){
    console.log(this.title);
    this.getJobs();
}

function init(){
    var jobptions = {
        parentClass:'job-list-container'
    };

    var joblist = new JobList_1(jobptions);

    joblist.render();
}

$(document).ready(function(){
    init();
})
