function JobList_1(options){
    this.constructor(options);
}

JobList_1.prototype.addScrollListener = function(){
    $(window).scroll(function(e){
        this.checkScroll(e);
    }.bind(this))
};

JobList_1.prototype.checkScroll = function(event){
    var scrolltop = $(window).scrollTop();
    var scrollHeight = $(window).height();
    var docHeight = $(document).height();
    var totalScroll = scrolltop + scrollHeight;
    var diff = Math.abs(totalScroll - docHeight);

    if(diff <= 2){
        console.log('load');
        this.getJobs(this.currentPage,true);
    }
};

JobList_1.prototype.initCardListener = function(card){
    var self = this;
    card.click(function(event){
        var index = $(this).data(this.jobIndex).jobIndex;
        self.setJobPosition(index)
    });
};

JobList_1.prototype.setJobPosition = function(index){
    var job = this.jobData[index];
    this.mapInterface.positionMap(job,index)
};


JobList_1.prototype.buildSingleCard = function(cardData,index){
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
    //use for retrieving data
    card.attr('data-' + this.jobIndex,index)
    return card;
};

JobList_1.prototype.buildCards = function(data,addPage){
    var jobCard = $('<div class="job-cards"></div>');
    let jobCards = addPage ?  $(this.jobCardsContainer) : null;
    for(var i = 0;i < data.length;i++){
        var cardData = data[i];
        var card = this.buildSingleCard(cardData,i);
        if(addPage){
            jobCards.append(card)
        }else{
            jobCard.append(card);
        }
        this.initCardListener(card);
    }
    if(!addPage){
        this.parent.append(jobCard);
    }
};

//placeholder for ajax calls
//need seperate function for appending jobs
JobList_1.prototype.getJobs = function(page,addPage){
    var url = 'https://job-dummy-api.herokuapp.com/api/indeed';
    if(page){
        url += '?page=' + page;
    }
    var req = {
        method:'GET',
        url:url
    };

    $.ajax(req)

    .then(response => {
        console.log(response);
        this.buildCards(response.data.results,addPage);
        this.mapOptions.jobData = response.data.results;
        this.mapInterface = new MapInterface(this.mapOptions);
        this.jobData = this.jobData.concat(response.data.results);
        this.currentPage++;
    })

    .catch(err => {
        console.log('Error getting data: ',err);
    })
};

JobList_1.prototype.constructor = function(options){
    this.title = "Simple List";
    var parentSelector = options.parentClass.startsWith('.') ? options.parentClass : '.' + options.parentClass;
    //wrap selected dom element in $ to make $ object available to class
    this.parent = $($(parentSelector)[0]);
    this.mapOptions = options.mapOptions;
    this.mapInterface;
    this.jobIndex = 'job-index';
    this.jobData = [];
    this.currentPage = 1;
    this.addScrollListener();
    this.jobCardsContainer = '.job-cards';
};

JobList_1.prototype.render = function(){
    console.log(this.title);
    this.getJobs();
};
//called by google maps callback
function init(){
    var jobptions = {
        parentClass:'job-list-container',
        mapOptions:{
            id:'map'
        }
    };

    var joblist = new JobList_1(jobptions);

    joblist.render();
    
}
