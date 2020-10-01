let answer = "joey";
let splashText = "../scripts/splashText.json"["splashText"];

function SetSplashText()
{
    document.getElementById("submission").innerHTML = splashText[GetRandomInt(splashText.length)];
}

function GetText()
{
    var guess = document.getElementById("guess").value;
    if (guess == answer)
    {
        document.getElementById("submission").innerHTML = "You got it right!";
    }
}

function GetRandomInt(max)
{
    return Math.Floor(Math.Random() * Math.Floor(max));
}