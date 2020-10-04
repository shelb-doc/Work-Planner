$(document).ready(function () {
    console.log("This is loading!");
    // console.log(moment().format('H'));
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
    function renderDate(){
        $("#currentDay").text (moment().format('MMMM Do YYYY, h:mm:ss a'));
    }

    function renderPlanner(){
        var currentTime = moment().format('H');
        var currentClass = "";
        for(i=0; i<9; i++){
            var time = twelveHr(9 + i)
            if (currentTime == (9 + i)){
                currentClass = "present";
            } else if (currentTime > (9 + i)) {
                currentClass = "past";
            } else {
                currentClass = "future";
            }
            var content = '<form class="row">'
            content += '<div class="col-md-1 hour">' + (time) + '</div>';
            content += '<div class="col-md-10 description p-0"><textarea class="'+ currentClass +'" id="'+ (time) +'"></textarea>' + '</div>';
            content += '<button class="col-md-1 saveBtn"><i class="far fa-save fa-lg"></i></button>';
            content += "</form>"
            $('.container').append(content);
        }
    }

    // FUNCTION CALLS
    setInterval(renderDate, 1000);
    renderPlanner()


    // $("#9AM").addClass("past");
    // EVENT LISTENERS


});