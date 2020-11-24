window.onload = function()
{
    const response = await fetch("https://photoslibrary.googleapis.com/v1/albums");
    const responseJson = await response.json();
    console.log(responseJson);
}