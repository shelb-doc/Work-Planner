$(document).ready(function () {
    // DOM VARIABLES
    // JS VARIABLES
    myStorage = window.localStorage;
    if(myStorage.getItem("use24hr") == null){
        myStorage.setItem("use24hr", false);
    } 
    if(myStorage.getItem("theme") == null){
        myStorage.setItem("theme", "light");
    } 
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
            var time = "";
            if (myStorage.getItem("use24hr")=="true"){
                time = (9 + i)
            } else {
                time = twelveHr(9 + i)
            }
            if (currentTime > (9 + i)){
                currentClass = "past";
                isDisabled = "";
            } else if (currentTime == (9 + i)) {
                currentClass = "present";
                isDisabled = "";
            } else {
                currentClass = "future";
                isDisabled = "";
            }
            if(myStorage.getItem(twelveHr(9 + i)) == null){
                myStorage.setItem(twelveHr(9 + i), " ");
            }
            var content = '<form class="row">'
            content += '<div class="col-md-1 hour">' + (time) + '</div>';
            content += '<div class="col-md-10 description p-0"><textarea '+ isDisabled +' class="'+ currentClass +'" id="'+ (twelveHr(9 + i)) +'">'+ myStorage.getItem(twelveHr(9 + i)) +'</textarea></div>';
            content += '<button class="col-md-1 saveBtn"><i class="far fa-save fa-lg"></i></button>';
            content += "</form>"
            $('.container').append(content);
        }
    }
    function renderLightMode(){
        console.log("Turn on Light mode");
        $( "#dark" ).removeClass( "active" )
        $( "#light" ).addClass( "active" )
        $( "#light,#dark,#24hrs,#amPm" ).addClass( "btn-light" )
        $( "#light,#dark,#24hrs,#amPm" ).removeClass( "btn-dark" )
        $( "body" ).css( "background", "white" )
        $( ".jumbotron" ).css( "color", "black" )
        $( ".jumbotron" ).css( "border-bottom", "10px solid black" )
        $( ".row" ).css( "border-top", "1px solid white" )
        $( ".hour" ).css( "border-top", "1px dashed #000000" )
        $( ".hour" ).css( "color", "#000000" )
        $( ".hour" ).css( "background-color", " #ffffff" )
        myStorage.setItem("theme", "light");
    }
    function renderDarkMode(){
        console.log("Turn on Dark mode");
        $( "#light" ).removeClass( "active" )
        $( "#dark" ).addClass( "active" )
        $( "#light,#dark,#24hrs,#amPm" ).removeClass( "btn-light" )
        $( "#light,#dark,#24hrs,#amPm" ).addClass( "btn-dark" )
        $( ".jumbotron" ).css( "color", "white" )
        $( ".jumbotron" ).css( "border-bottom", "10px solid white" )
        $( ".row" ).css( "border-top", "1px solid #072540" )
        $( "body" ).css( "background", "#072540" )
        $( ".hour" ).css( "border-top", "1px dashed white" )
        $( ".hour" ).css( "color", "#ffffff" )
        $( ".hour" ).css( "background-color", " #072540" )
        myStorage.setItem("theme", "dark");
    }
    function renderAmPm(){
        console.log("Turn on AM / PM mode");
        $( "#24hrs" ).removeClass( "active" )
        $( "#amPm" ).addClass( "active" )
        myStorage.setItem("use24hr", false);
        $( ".container" ).empty();
        renderPlanner()
    }
    function render24hrs(){
        console.log("Turn on 24 hours mode");
        $( "#amPm" ).removeClass( "active" )
        $( "#24hrs" ).addClass( "active" )
        myStorage.setItem("use24hr", true);
        $( ".container" ).empty();
        renderPlanner()
    }
    // FUNCTION CALLS
    setInterval(renderDate, 1000);
    renderPlanner()
    if (myStorage.getItem("use24hr")=="true"){
        render24hrs();
    } else {
        renderAmPm();
    }
    if (myStorage.getItem("theme")=="light"){
        renderLightMode();
    } else {
        renderDarkMode();
    }

    // EVENT LISTENERS
    $( ".saveBtn" ).click(function() {
        for(i=0; i<9; i++){
            var time = twelveHr(9 + i)
            myStorage.setItem(time, $("#"+time).val());
        }
    });
    $( "#light" ).click(function() {
        renderLightMode()
    });
    $( "#dark" ).click(function() {
        renderDarkMode()
    });
    $( "#amPm" ).click(function() {
        renderAmPm()
    });
    $( "#24hrs" ).click(function() {
        render24hrs()
    });
});