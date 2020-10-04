$(document).ready(function () {
    console.log("This is loading!");
    // DOM VARIABLES
    // JS VARIABLES
    // FUNCTION DEFINITIONS
    // FUNCTION CALLS
    // EVENT LISTENERS

    // make date appear on jumbo
    // creates the layout of the tables
    var content = "<table>"
    for(i=0; i<9; i++){
        content += '<tr><td>' + (9 + i) + '</td>';
        content += '<td>' + '<textarea id="meetingName'+ (9 + i) +'"></textarea>' + '</td>';
        content += '<td>' + '<button type="button" class="btn btn-primary btn-lg">Save</button>' + '</td></tr>';
    }
    content += "</table>"
    $('.container').append(content);
        // make 3 col 
        // times 
});