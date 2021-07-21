var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

$(document).keypress( function() {
    if ( !started ) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$( ".btn" ).click( function() {
    var userChosenColour = $(this).attr("id") ;
    userClickedPattern.push( userChosenColour );

    animatePress( userChosenColour );
    playSound( userChosenColour );
    

    checkAnswer( userClickedPattern.length - 1 );
} );

function checkAnswer( currentLevel ) {
    if ( userClickedPattern[ currentLevel ] === gamePattern[currentLevel] ) {
        console.log("success");
        
        if ( userClickedPattern.length === gamePattern.length ) {
            setTimeout( function() {
                nextSequence();
            }, 1000 );
        }
    } else {
         playSound( "wrong" );
        $("body").addClass("game-over");

        setTimeout( function() {
            $("body").removeClass("game-over");
        }, 200 );
        
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    } 
} 

function startOver () {
    gamePattern = [];
    started = false;
    level = 0;
}

function nextSequence() {

    userClickedPattern = [];
    var randomNumber = Math.floor( Math.random() * 4 );
    var randomChosenColour = buttonColours[ randomNumber ];
    gamePattern.push( randomChosenColour );

    // 1. Use jQuery to select the randomChosenColour
    // 2. Use jQuery to add a flash animation to the colour button
    $( "#" + randomChosenColour ).fadeIn( 100 ).fadeOut( 100 ).fadeIn( 100 );

    // 3. use javascript to add sound to the button selected in step 1.
    playSound( randomChosenColour );

    level++;
    $("h1").text( "Level " + level);
}

function playSound( name ) {

    var audio = new Audio( "sounds/" + name + ".mp3" );
    audio.play();

}

function animatePress( currentColour ) {

    $( "#" + currentColour ).addClass( "pressed" );

    setTimeout(function() {
        $( "#" + currentColour ).removeClass("pressed");
    }, 100 );
}

