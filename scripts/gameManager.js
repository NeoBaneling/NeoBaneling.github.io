let answer = "joey";

function GetText()
{
    var guess = document.getElementById("guess").value;
    if (guess == answer)
    {
        document.getElementById("submission").innerHTML = "You got it right!";
    }
}