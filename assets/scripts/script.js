$(document).ready(function () {
    // DOM VARIABLES
    // JS VARIABLES
    myStorage = window.localStorage;
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
        var isDisabled = "";
        for(i=0; i<9; i++){
            var time = twelveHr(9 + i)
            if (currentTime > (9 + i)){
                currentClass = "past";
                isDisabled = "disabled";
            } else if (currentTime == (9 + i)) {
                currentClass = "present";
                isDisabled = "";
            } else {
                currentClass = "future";
                isDisabled = "";
            }
            if(myStorage.getItem(time) == null){
                myStorage.setItem(time, " ");
            }
            var content = '<form class="row">'
            content += '<div class="col-md-1 hour">' + (time) + '</div>';
            content += '<div class="col-md-10 description p-0"><textarea '+ isDisabled +' class="'+ currentClass +'" id="'+ (time) +'">'+ myStorage.getItem(time) +'</textarea></div>';
            content += '<button class="col-md-1 saveBtn"><i class="far fa-save fa-lg"></i></button>';
            content += "</form>"
            $('.container').append(content);
        }
    }

    // FUNCTION CALLS
    setInterval(renderDate, 1000);
    renderPlanner()

    // EVENT LISTENERS
    $( ".saveBtn" ).click(function() {
        for(i=0; i<9; i++){
            var time = twelveHr(9 + i)
            myStorage.setItem(time, $("#"+time).val());
        }
    });
});