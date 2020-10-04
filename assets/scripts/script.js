$(document).ready(function () {
    console.log("This is loading!");
    console.log(moment().format('hA'))
    // DOM VARIABLES
    // JS VARIABLES
    // FUNCTION DEFINITIONS

    function twelveHr(hour){
        if (hour > 12){
            return ((hour - 12) + "PM")
        }
        else {
            return (hour + "AM")
        }
    }

    function renderPlanner(){
        for(i=0; i<9; i++){
            var time = twelveHr(9 + i)
            var content = '<form class="row">'
            content += '<div class="col-md-1 hour">' + (time) + '</div>';
            content += '<div class="col-md-10 description p-0"><textarea class="past" id="meetingName'+ (time) +'"></textarea>' + '</div>';
            content += '<button class="col-md-1 saveBtn"><i class="far fa-save fa-lg"></i></button>';
            content += "</form>"
            $('.container').append(content);
        }
    }

    // FUNCTION CALLS

    $("#currentDay").text (moment().format('MMMM Do YYYY, h:mm:ss a'));

    renderPlanner()
    // EVENT LISTENERS


});