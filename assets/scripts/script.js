$(document).ready(function () {
    // JS VARIABLES
    // initialize local storage
    myStorage = window.localStorage;
    // check if use24hr is null if so set to false
    if(myStorage.getItem("use24hr") == null){
        myStorage.setItem("use24hr", false);
    } 
    // check if theme is null if so set to light
    if(myStorage.getItem("theme") == null){
        myStorage.setItem("theme", "light");
    } 
    // FUNCTION DEFINITIONS
    // converts military time to AM/PM time
    function twelveHr(hour){
        if (hour > 12){
            return ((hour - 12) + "PM")
        }
        else {
            return (hour + "AM")
        }
    }
    // sets currentDay's text to the current day and time
    function renderDate(){
        if (myStorage.getItem("use24hr")=="true"){
            $("#currentDay").text (moment().format('MMMM Do YYYY, H:mm:ss'));
        } else {
            $("#currentDay").text (moment().format('MMMM Do YYYY, h:mm:ss a'));
        }
    }
    // iterates from 0 to 8 and generates 9 forms that contain time, textarea, and saveBtn then adds them to the container
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
                isDisabled = "disabled";
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
        if (myStorage.getItem("theme")=="light"){
            renderLightMode();
        } else {
            renderDarkMode();
        }
    }
    // disables the dark theme btn and enables the Light theme
    function renderLightMode(){
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
    // disables the light theme btn and enables the dark theme
    function renderDarkMode(){
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
    // updates the Planner to use AM/PM time
    function renderAmPm(){
        $( "#24hrs" ).removeClass( "active" )
        $( "#amPm" ).addClass( "active" )
        myStorage.setItem("use24hr", false);
        $( ".container" ).empty();
        renderPlanner()
    }
    // updates the Planner to use Military time
    function render24hrs(){
        $( "#amPm" ).removeClass( "active" )
        $( "#24hrs" ).addClass( "active" )
        myStorage.setItem("use24hr", true);
        $( ".container" ).empty();
        renderPlanner()
    }
    // FUNCTION CALLS
    // starts the date display and updates every second
    setInterval(renderDate, 1000);
    // creates the planner
    renderPlanner()
    // checks the settings in local storage and updates the page
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
    // detects when a save btn is clicked and saves all textarea values to local storage
    $( ".saveBtn" ).click(function() {
        for(i=0; i<9; i++){
            var time = twelveHr(9 + i)
            myStorage.setItem(time, $("#"+time).val());
        }
    });
    // detects if light mode is clicked and updates the page
    $( "#light" ).click(function() {
        renderLightMode()
    });
    // detects if dark mode is clicked and updates the page
    $( "#dark" ).click(function() {
        renderDarkMode()
    });
    // detects if AM/PM  is clicked and updates the page
    $( "#amPm" ).click(function() {
        renderAmPm()
    });
    // detects if Military time is clicked and updates the page
    $( "#24hrs" ).click(function() {
        render24hrs()
    });
});