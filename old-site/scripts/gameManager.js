let answer = "joey";
var step = -1;

// Loads in the Splash Text JSON and pulls a random splash text
$(document).ready(function() {
    $.getJSON("../scripts/splashText.json", function(data) {
        SetSplashText(data["splashText"][GetRandomInt(data["splashText"].length)])
    }).fail(function() {
        console.log("Unable to load splash Text");
        SetSplashText("Who coded this thing?!");
    });
});

function SetSplashText(splashText)
{
    document.getElementById("guess").placeholder = splashText;
}

function GetText()
{
    var guess = document.getElementById("guess").value;
    if (guess == answer)
    {
        document.getElementById("submission").innerHTML = "You got it right!";
    }
}

 /******************
 *                 *
 * UTILITY METHODS *
 *                 *
 ******************/

function GetRandomInt(max)
{
    return Math.floor(Math.random() * Math.floor(max));
}